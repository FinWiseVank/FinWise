import React from 'react'

export const Table = ({ title, data }) => {
  return (
    <div className="table-container">
      <h2 className="text-center text-2xl font-bold my-4 text-blue-500">{title}</h2>
      <table className="table-auto w-full overflow-hidden">
        <thead>
          <tr>
            <th className="px-4 py-2 border ">Descripción</th>
            <th className="px-4 py-2 border ">Gastos Previstos</th>
            <th className="px-4 py-2 border ">Gastos Reales</th>
            <th className="px-4 py-2 border ">Diferencia</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-gray-200' : 'bg-blue-100'}>
              <td className="border px-4 py-4">{row.descripcion}</td>
              <td className="border px-4 py-4">{row.gastosPrevistos}</td>
              <td className="border px-4 py-4">{row.gastosReales}</td>
              <td className="border px-4 py-4">{row.diferencia}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
