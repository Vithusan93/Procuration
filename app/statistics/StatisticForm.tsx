import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import Donut from "./Donut";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Bar Chart",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: labels.map(() => 30),
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Dataset 2",
      data: labels.map(() => 40),
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

const StatisticForm = () => {
  return (
    <div className="flex p-2">
      <div className="w-1/3">
        <Donut />
      </div>
      <div className="w-2/3">
        <Bar options={options} data={data} />
      </div>
    </div>
  );
};
export default StatisticForm;
