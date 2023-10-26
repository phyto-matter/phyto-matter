import { useMemo } from "react";
import {
  ContaminantEntry,
  NORMALISED_PHYTO_DATA,
  PlantEntry,
  ReferenceEntry,
} from "../utils/get-normalised-phyto-data";
import { uniqBy } from "lodash";

export type ContaminantSuggestion = {
  contaminantId: string;
  contaminant: string;
  plantId: string;
  plant: string;
  vegetation_type: string;
  lower_rate: number;
  upper_rate: number;
  references: ReferenceEntry[];
};

export function usePlantSuggestions(
  contaminants: string[],
): ContaminantSuggestion[] {
  const byContaminant = useMemo(() => {
    const grouped = new Map<string, PlantEntry[]>();

    NORMALISED_PHYTO_DATA.forEach((plant) =>
      plant.contaminants.forEach((e) => {
        const existing = grouped.get(e.name) || [];

        grouped.set(e.name, [...existing, plant]);
      }),
    );

    return grouped;
  }, []);

  return useMemo(
    () =>
      contaminants.flatMap((c) => {
        const candidates = byContaminant.get(c) || [];

        const suggestions = candidates
          .flatMap((p) =>
            p.contaminants
              .filter((_) => _.name === c)
              .map((c): [PlantEntry, ContaminantEntry] => [p, c]),
          )
          .reduce(
            (agg, [pla, con]) => {
              const existing = agg[con.symbol];
              const suggestion: ContaminantSuggestion = existing || {
                contaminantId: con.id,
                contaminant: con.name,
                plantId: pla.id,
                plant: pla.latin_name,
                vegetation_type: pla.vegetation_type,
                lower_rate: 0,
                upper_rate: 0,
                references: [],
              };
              const allRates = con.removal_rates
                .map((_) => _.removal_rate)
                .concat(
                  [suggestion.lower_rate, suggestion.upper_rate].filter(
                    Boolean,
                  ),
                )
                .sort();

              return {
                ...agg,
                [con.symbol]: {
                  ...suggestion,
                  lower_rate: allRates.at(0) || 0,
                  upper_rate: allRates.at(-1) || 0,
                  references: uniqBy(
                    [
                      ...suggestion.references,
                      ...con.removal_rates.map((_) => _.reference),
                    ],
                    "reference",
                  ),
                },
              };
            },
            {} as { [k: string]: ContaminantSuggestion },
          );

        return Object.values(suggestions);
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [contaminants.sort().join(), byContaminant],
  );
}
