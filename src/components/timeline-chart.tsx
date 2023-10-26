import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import autocolors from "chartjs-plugin-autocolors";
import { ContaminantSuggestion } from "../hooks/use-plant-suggestions";
import {
  TableRowEntry,
  useCalculatedRemoval,
} from "../hooks/use-calculated-removal";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  autocolors,
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom" as const,
    },
    autocolors: {
      offset: 15,
    },
  },
};

export function TimelineChart({
  entries,
  suggestions,
}: {
  entries: TableRowEntry[];
  suggestions: ContaminantSuggestion[];
}) {
  const data = useCalculatedRemoval(entries, suggestions);

  return <Line options={options} data={data} />;
}
