import React, { useRef, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Registrar los componentes necesarios para evitar errores
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const GraphGeneral = () => {
  const chartRef = useRef(null); // Referencia al gráfico

  // Datos de ingresos y gastos
  const data = {
    labels: ["Enero", "Febrero", "Marzo", "Abril"], // Meses
    datasets: [
      {
        label: "Gastos",
        data: [500, 700, 800, 600], // Valores de gastos
        backgroundColor: "rgba(220, 38, 38, 0.8)", // Rojo más intenso
        borderColor: "rgba(220, 38, 38, 1)",
        borderWidth: 1,
        barThickness: "flex", // Ajustar automáticamente el grosor de las barras
      },
      {
        label: "Ingresos",
        data: [1000, 1200, 1100, 1300], // Valores de ingresos
        backgroundColor: "rgba(34, 197, 94, 0.8)", // Verde fuerte
        borderColor: "rgba(34, 197, 94, 1)",
        borderWidth: 1,
        barThickness: "flex", // Ajustar automáticamente el grosor de las barras
      },
    ],
  };

  // Opciones para personalizar el gráfico
  const options = {
    responsive: true, // Hacer el gráfico responsivo
    maintainAspectRatio: false, // Permitir que el gráfico ocupe todo el contenedor
    plugins: {
      legend: {
        position: "top", // Ubicación de la leyenda
      },
    },
    scales: {
      x: {
        ticks: {
          maxRotation: 45, // Rotar etiquetas si es necesario
          minRotation: 0,
        },
      },
    },
  };

  // Redibujar el gráfico al cambiar el tamaño de la ventana
  useEffect(() => {
    const handleResize = () => chartRef.current?.chart?.resize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md w-full h-full"> {/* Ajustar ancho al 100% */}
      <h2 className="text-base md:text-lg font-bold mb-4 text-center">Gastos e Ingresos</h2>
      <div className="w-full h-48 sm:h-60 md:h-80 lg:h-96"> {/* Mantener altura responsiva */}
        <Bar ref={chartRef} data={data} options={options} /> {/* Referencia al gráfico */}
      </div>
    </div>
  );
};
