import React, { useEffect, useRef } from "react";
import { Chart, ChartConfiguration } from "chart.js/auto";

const StatisticForm: React.FC = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const doughnutChartRef = useRef<HTMLCanvasElement | null>(null);
  const pieChartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart<"bar"> | null>(null);
  const doughnutChartInstanceRef = useRef<Chart<"doughnut"> | null>(null);
  const pieChartInstanceRef = useRef<Chart<"pie"> | null>(null);

  useEffect(() => {
    const data: ChartConfiguration<"bar"> = {
      type: "bar",
      data: {
        labels: ["Semaine 1", "Semaine 2", "Semaine 3", "Semaine 4"],
        datasets: [
          {
            label: "Ventes",
            backgroundColor: "rgba(75,192,192,0.2)",
            borderColor: "rgba(75,192,192,1)",
            borderWidth: 1,
            hoverBackgroundColor: "rgba(75,192,192,0.4)",
            hoverBorderColor: "rgba(75,192,192,1)",
            data: [65, 59, 80, 81],
          },
        ],
      },
      options: {
        scales: {
          x: {
            beginAtZero: true,
          },
          y: {
            beginAtZero: true,
          },
        },
      },
    };

    const doughnutData: ChartConfiguration<"doughnut"> = {
      type: "doughnut",
      data: {
        labels: ["Service A", "Service B", "Service C"],
        datasets: [
          {
            data: [300, 50, 100],
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
            hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: true,
          },
        },
      },
    };

    const pieData: ChartConfiguration<"pie"> = {
      type: "pie",
      data: {
        labels: ["Service", "Produit "],
        datasets: [
          {
            data: [450, 200],
            backgroundColor: ["#FF6384", "#36A2EB"],
            hoverBackgroundColor: ["#FF6384", "#36A2EB"],
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: true,
          },
        },
      },
    };

    const ctx = chartRef.current?.getContext("2d");
    const doughnutCtx = doughnutChartRef.current?.getContext("2d");
    const pieCtx = pieChartRef.current?.getContext("2d");

    if (ctx && doughnutCtx && pieCtx) {
      // Détruire les graphiques existants s'il y en a
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
      if (doughnutChartInstanceRef.current) {
        doughnutChartInstanceRef.current.destroy();
      }
      if (pieChartInstanceRef.current) {
        pieChartInstanceRef.current.destroy();
      }

      // Créer un nouveau graphique de type bar
      chartInstanceRef.current = new Chart(ctx, data);

      // Créer un nouveau graphique de type doughnut
      doughnutChartInstanceRef.current = new Chart(doughnutCtx, doughnutData);

      // Créer un nouveau graphique de type pie
      pieChartInstanceRef.current = new Chart(pieCtx, pieData);
    }

    // Fonction de nettoyage pour détruire les graphiques lorsqu'ils ne sont plus nécessaires
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
      if (doughnutChartInstanceRef.current) {
        doughnutChartInstanceRef.current.destroy();
      }
      if (pieChartInstanceRef.current) {
        pieChartInstanceRef.current.destroy();
      }
    };
  }, [chartRef, doughnutChartRef, pieChartRef]);

  return (
    <div>
      <canvas ref={chartRef}></canvas>
      <canvas ref={doughnutChartRef}></canvas>
      <canvas ref={pieChartRef}></canvas>
      {/* Autres éléments de votre formulaire de statistiques */}
    </div>
  );
};

export default StatisticForm;
