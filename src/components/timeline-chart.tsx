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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

const data = {
  labels: labels,
  datasets: [
    {
      label: "Cadmium",
      data: [7, 6, 5, 3, 2, 1, 0],
      borderColor: "red",
      backgroundColor: "red",
      fill: true,
    },
    {
      label: "Aluminium",
      data: [17, 14, 10, 5, 3, 2, 1],
      borderColor: "blue",
      backgroundColor: "blue",
      fill: true,
    },
    {
      label: "Cesium",
      data: [5, 3, 1, 0, 0, 0, 0],
      borderColor: "green",
      backgroundColor: "green",
      fill: true,
    },
    {
      label: "Lead",
      data: [20, 15, 10, 5, 3, 2, 1],
      borderColor: "yellow",
      backgroundColor: "yellow",
      fill: true,
    },
  ],
};

export function TimelineChart() {
  return <Line options={options} data={data} />;
}
