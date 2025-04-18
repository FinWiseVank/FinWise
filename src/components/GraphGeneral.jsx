// GraphGeneral.jsx
import React, { useRef, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Registrar los componentes necesarios para evitar errores
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const GraphGeneral = ({ ingresos, gastos }) => {
  const chartRef = useRef(null); // Referencia al gráfico

  const data = {
    labels: ["Enero", "Febrero", "Marzo", "Abril"],
    datasets: [
      {
        label: "Gastos",
        data: gastos,
        backgroundColor: "rgba(220, 38, 38, 0.8)",
      },
      {
        label: "Ingresos",
        data: ingresos,
        backgroundColor: "rgba(34, 197, 94, 0.8)",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      x: {
        ticks: {
          maxRotation: 45,
          minRotation: 0,
        },
      },
    },
  };

  useEffect(() => {
    const handleResize = () => chartRef.current?.chart?.resize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md w-full h-full">
      <h2 className="text-base md:text-lg font-bold mb-4 text-center">Gastos e Ingresos</h2>
      <div className="w-full h-48 sm:h-60 md:h-80 lg:h-96">
        <Bar ref={chartRef} data={data} options={options} />
      </div>
    </div>
  );
};
