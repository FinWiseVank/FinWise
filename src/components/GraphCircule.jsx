import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Registrar los componentes necesarios para evitar errores
ChartJS.register(ArcElement, Tooltip, Legend);

function GraphCircule({ data }) {
  // Transformar los datos en el formato requerido por Chart.js
  const chartData = {
    labels: data.map((item) => item.name),
    datasets: [
      {
        data: data.map((item) => item.value),
        backgroundColor: ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'],
        borderColor: ['#ffffff'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Permitir que el gráfico ocupe todo el contenedor
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div className="w-full h-auto"> {/* Contenedor responsivo */}
      <Doughnut data={chartData} options={options} />
    </div>
  );
}

export default GraphCircule;