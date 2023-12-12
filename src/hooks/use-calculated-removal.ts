import { ContaminantRates } from "./use-plant-suggestions";
import { useMemo } from "react";

export type TableRowEntry = {
  contaminant: string;
  concentration: number;
};

const labels = Array(12)
  .fill("")
  .map((_, i) => `Month ${i + 1}`);

export function useCalculatedRemoval(
  entries: TableRowEntry[],
  suggestions: ContaminantRates[],
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
  suggestion: ContaminantRates,
): number[] {
  return labels
    .map(
      (_, i) =>
        concentration -
        i * ((suggestion.upper_rate || 0) * (suggestion.mass_kg_m2 || 0)),
    )
    .map((i) => (i > 0 ? i : 0));
}
