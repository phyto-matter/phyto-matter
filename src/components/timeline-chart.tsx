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
import { Typography } from "@mui/material";
import { capitalize } from "lodash";

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

  return (
    <>
      <Typography variant="subtitle1" gutterBottom sx={{ mb: 3 }}>
        <b>Disclaimer:</b> These are <i>example</i> removal rates based on an
        assumed mass by tissue type of
        <br />
        {suggestions
          .map(
            (s) =>
              `${capitalize(s.plant)} (${capitalize(
                s.tissue_type,
              )}): ${s.mass_kg_m2.toLocaleString()} kgs/m2`,
          )
          .join(", ")}
        .<br />
        Please see the references for how to produce an actual calculation for
        your specific situation
      </Typography>
      <Line options={options} data={data} />
    </>
  );
}
