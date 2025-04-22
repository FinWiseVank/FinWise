import React, { useRef, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Registrar los componentes necesarios para evitar errores
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const GraphGeneral = ({ labels, ingresosData, gastosData }) => {
  const chartRef = useRef(null);

  // Verifica que las props existan y tengan datos antes de configurar
  const hasData = labels && labels.length > 0 && ingresosData && gastosData;

  const data = {
    labels: hasData ? labels : [], // Usa las etiquetas recibidas como prop
    datasets: [
      {
        label: "Gastos",
        data: hasData ? gastosData : [], // Usa los datos de gastos recibidos
        backgroundColor: "rgba(239, 68, 68, 0.7)", // Rojo más suave (Tailwind red-500)
        borderColor: "rgba(220, 38, 38, 1)",
        borderWidth: 1,
      },
      {
        label: "Ingresos",
        data: hasData ? ingresosData : [], // Usa los datos de ingresos recibidos
        backgroundColor: "rgba(34, 197, 94, 0.7)", // Verde (Tailwind green-500)
        borderColor: "rgba(22, 163, 74, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Importante para que el gráfico llene el contenedor
    plugins: {
      legend: {
        position: "top",
        labels: {
          boxWidth: 20, // Ancho de la caja de color
          padding: 20, // Espaciado
        },
      },
      title: {
        display: false, // Lo mantenemos en DbInicio por ahora
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null) {
              // Formatear como moneda (ejemplo simple, puedes usar librerías)
              label += new Intl.NumberFormat("es-CO", {
                style: "currency",
                currency: "COP",
                minimumFractionDigits: 0,
              }).format(context.parsed.y);
            }
            return label;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // Ocultar líneas de la cuadrícula X
        },
        ticks: {
          autoSkip: true, // Saltar etiquetas si hay muchas
          maxTicksLimit: 12,
        },
        // Más delgadas y más juntas
        barPercentage: 0.4, // Más delgadas (default: 0.9)
        categoryPercentage: 0.5, // Más juntas (default: 0.8)
      },
      y: {
        beginAtZero: true, // Empezar el eje Y en 0
        grid: {
          color: "rgba(200, 200, 200, 0.2)", // Líneas de cuadrícula Y más sutiles
        },
        ticks: {
          callback: function (value) {
            if (value >= 1000000) return value / 1000000 + "M";
            if (value >= 1000) return value / 1000 + "K";
            return new Intl.NumberFormat("es-CO", {
              style: "currency",
              currency: "COP",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).format(value);
          },
        },
      },
    },
    hover: {
      // Modificar el comportamiento de hover
      mode: "nearest", // Asegura que se activa el hover solo cuando el mouse está cerca de la barra
      intersect: true, // Hover solo cuando el mouse está sobre la barra
      animationDuration: 200, // Duración de la animación de hover
      onHover: function (event, chartElement) {
        // Aquí puedes agregar efectos adicionales, como cambios de color al pasar el mouse
        const chart = chartElement[0]?._chart;
        if (chartElement.length > 0) {
          const datasetIndex = chartElement[0].datasetIndex;
          const index = chartElement[0].index;
          const dataset = chart.data.datasets[datasetIndex];
          dataset.backgroundColor = dataset.backgroundColor.map((color, idx) =>
            idx === index ? "rgba(255, 159, 64, 1)" : color // Cambia el color de la barra al pasar el cursor
          );
          chart.update(); // Actualiza el gráfico con el nuevo color
        }
      },
    },
  };

  // Redimensionamiento (sin cambios, ya estaba bien)
  useEffect(() => {
    const handleResize = () => {
      // Pequeño retraso para asegurar que el contenedor tenga el tamaño final
      setTimeout(() => {
        chartRef.current?.chart?.resize();
      }, 50);
    };
    window.addEventListener("resize", handleResize);

    // Llama a resize una vez al montar por si acaso
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    // El div contenedor ahora controla el tamaño y el padding
    <div className="w-full h-full">
      {hasData ? (
        <Bar ref={chartRef} data={data} options={options} />
      ) : (
        <div className="flex items-center justify-center h-full text-gray-500">
          No hay datos mensuales para mostrar.
        </div>
      )}
    </div>
  );
};
