import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Registrar los componentes necesarios para evitar errores
ChartJS.register(ArcElement, Tooltip, Legend);

function GraphCircule({ data }) {
  // Verifica si hay datos antes de intentar renderizar el gráfico
  if (!data || data.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center text-gray-500">
        No hay datos disponibles.
      </div>
    );
  }

  // Transformar los datos en el formato requerido por Chart.js
  const chartData = {
    labels: data.map((item) => item.name), // Etiquetas de cada segmento
    datasets: [
      {
        data: data.map((item) => item.value), // Valores de cada segmento
        backgroundColor: ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'], // Colores para cada segmento
        borderColor: ['#ffffff'], // Color de borde blanco
        borderWidth: 1, // Ancho del borde
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Permitir que el gráfico ocupe todo el contenedor
    plugins: {
      legend: {
        position: 'top', // Posición de la leyenda
      },
      tooltip: {
        enabled: true, // Habilitar tooltip al pasar el mouse
        callbacks: {
          label: function (tooltipItem) {
            const value = tooltipItem.raw; // Obtener el valor de cada segmento
            return `${tooltipItem.label}: ${new Intl.NumberFormat('es-CO', {
              style: 'currency',
              currency: 'COP',
            }).format(value)}`; // Formatear el valor como moneda
          },
        },
      },
    },
    animation: {
      animateScale: true, // Activar animación para escalar
      animateRotate: true, // Activar animación para rotar
    },
  };

  return (
    <div className="w-full h-auto">
      <Doughnut data={chartData} options={options} />
    </div>
  );
}

export default GraphCircule;
