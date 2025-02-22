import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Registrar los componentes necesarios para evitar errores
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const GraphGeneral = () => {
  // Datos de ingresos y gastos
  const data = {
    labels: ["Enero", "Febrero", "Marzo"], // Meses
    datasets: [
      {
        label: "Gastos",
        data: [4000, 3500, 5000], // Valores de gastos
        backgroundColor: "rgba(255, 99, 132, 0.6)", // Rojo
      },
      {
        label: "Ingresos",
        data: [6000, 5000, 7000], // Valores de ingresos
        backgroundColor: "rgba(75, 192, 192, 0.6)", // Verde
      },
    ],
  };

  // Opciones para personalizar el gráfico
  const options = {
    responsive: true,
    maintainAspectRatio: false, // Permite que el gráfico ocupe todo el contenedor
    plugins: {
      legend: {
        position: "top", // Ubicación de la leyenda
      },
    },
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md w-full h-full"> 
      <h2 className="text-xl font-bold mb-4 text-center">Gastos e Ingresos</h2>
      <div className="w-full h-90"> {/* Ajusta la altura del contenedor */}
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};
