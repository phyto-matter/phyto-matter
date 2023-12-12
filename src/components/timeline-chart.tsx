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
import { ContaminantRates } from "../hooks/use-plant-suggestions";
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
  suggestions: ContaminantRates[];
}) {
  const data = useCalculatedRemoval(entries, suggestions);

  return (
    <>
      <Line options={options} data={data} />
      <Typography variant="subtitle1" gutterBottom sx={{ mt: 3, mb: 3 }}>
        <b>Disclaimer:</b>
        <br /> These are <u>example</u> removal rates based on an assumed mass
        by tissue type of:
        <br />
        {suggestions.map((s) => (
          <span>
            {`${capitalize(s.plant)} (${capitalize(s.tissue_type)}):`}{" "}
            <i>{`${s.mass_kg_m2.toLocaleString()} kgs/m2`}</i>
            ,&nbsp;
          </span>
        ))}
        .<br />
        Please see the references for how to produce an actual calculation for
        your specific situation
      </Typography>
    </>
  );
}
