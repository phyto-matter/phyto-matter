import { ContaminantSuggestion } from "./use-plant-suggestions";
import { useMemo } from "react";
import { KGS_BY_VEG_TYPE, VALID_VEGETATION_TYPES } from "../global-constants";

export type TableRowEntry = {
  contaminant: string;
  concentration: number;
};

const labels = Array(12)
  .fill("")
  .map((_, i) => `Month ${i + 1}`);

export function useCalculatedRemoval(
  entries: TableRowEntry[],
  suggestions: ContaminantSuggestion[],
) {
  const suggestionMap = useMemo(
    () => new Map(suggestions.map((s) => [s.contaminant, s])),
    [suggestions],
  );

  return useMemo(
    () => ({
      labels: labels,
      datasets: entries.map((e) => ({
        label: e.contaminant,
        data: suggestionMap.has(e.contaminant)
          ? removalOverTime(e.concentration, suggestionMap.get(e.contaminant)!)
          : [],
        fill: true,
      })),
    }),
    [entries, suggestionMap],
  );
}

function removalOverTime(
  concentration: number,
  suggestion: ContaminantSuggestion,
): number[] {
  return labels
    .map(
      (_, i) =>
        concentration -
        i *
          (suggestion.upper_rate *
            KGS_BY_VEG_TYPE[
              suggestion.vegetation_type as VALID_VEGETATION_TYPES
            ]),
    )
    .map((i) => (i > 0 ? i : 0));
}