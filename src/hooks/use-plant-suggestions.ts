import { useMemo } from "react";
import {
  ContaminantEntry,
  NORMALISED_PHYTO_DATA,
  PlantEntry,
  ReferenceEntry,
  RemovalRateEntry,
} from "../utils/get-normalised-phyto-data";
import { uniqBy } from "lodash";

export type ContaminantRates = {
  contaminantId: string;
  contaminant: string;
  abbreviation: string;
  category: string;
  plantId: string;
  plant: string;
  vegetation_type: string;
  tissue_type: string;
  mass_kg_m2: number;
  lower_rate: number;
  upper_rate: number;
  references: ReferenceEntry[];
};

export function usePlantSuggestions(
  contaminants: string[],
): ContaminantRates[] {
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

        return getPlantRates(candidates, c);
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [contaminants.sort().join(), byContaminant],
  );
}

export function getPlantRates(
  plants: PlantEntry[],
  specificContaminant?: string,
): ContaminantRates[] {
  const suggestions = plants
    .flatMap((p) =>
      p.contaminants
        .filter((_) => !specificContaminant || _.name === specificContaminant)
        .flatMap((c) =>
          c.removal_rates.map(
            (r): [PlantEntry, ContaminantEntry, RemovalRateEntry] => [p, c, r],
          ),
        ),
    )
    .reduce(
      (agg, [pla, con, rate]) => {
        const existingIndex = agg[con.abbreviation]?.findIndex(
          ({ plantId, tissue_type }) =>
            pla.id === plantId && rate.tissue_type === tissue_type,
        );
        const existing =
          existingIndex >= 0 && agg[con.abbreviation][existingIndex];
        const suggestion: ContaminantRates = existing || {
          contaminantId: con.id,
          contaminant: con.name,
          abbreviation: con.abbreviation,
          category: con.category,
          plantId: pla.id,
          plant: pla.genus,
          vegetation_type: pla.category,
          tissue_type: rate.tissue_type,
          mass_kg_m2: con.mass_kg_m2,
          lower_rate: 0,
          upper_rate: 0,
          references: [],
        };
        const allRates = [
          suggestion.lower_rate,
          suggestion.upper_rate,
          rate.removal_rate,
        ]
          .filter(Boolean)
          .sort();

        return {
          ...agg,
          [con.abbreviation]: [
            ...(agg[con.abbreviation] || []).filter(
              (_, i) => existingIndex < 0 || existingIndex !== i,
            ),
            {
              ...suggestion,
              lower_rate: allRates.length > 1 ? allRates[0] : 0,
              upper_rate: allRates.at(-1) || 0,
              references: uniqBy(
                [...suggestion.references, rate.reference],
                "reference",
              ),
            },
          ],
        };
      },
      {} as { [k: string]: ContaminantRates[] },
    );

  return Object.values(suggestions).flat();
}
