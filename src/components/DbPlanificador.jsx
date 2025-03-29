import React, { useState } from 'react';
import { Button } from './Button';
import FormTemplate from './FormTemplate';
import { Card } from './Card';
import { MenuModify } from './MenuModify'; // Importar MenuModify

export const DbPlanificador = () => {
  const [tableData, setTableData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    descripcion: '',
    gastosPrevistos: '',
    gastosReales: ''
  });
  const [hoveredRowIndex, setHoveredRowIndex] = useState(null); // Estado para rastrear la fila sobre la que se pasa el cursor

  const handleAddRow = () => {
    setShowForm(true);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setTableData((prev) => [...prev, formData]);
    setShowForm(false);
    setFormData({
      descripcion: '',
      gastosPrevistos: '',
      gastosReales: ''
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEditRow = (index) => {
    const rowToEdit = tableData[index];
    setFormData({ ...rowToEdit }); // Cargar los datos de la fila en el formulario
    setShowForm(true);
  };

  const handleDeleteRow = (index) => {
    const updatedTableData = tableData.filter((_, i) => i !== index); // Eliminar la fila localmente
    setTableData(updatedTableData);
  };

  const handleMouseEnter = (index) => {
    setHoveredRowIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredRowIndex(null);
  };

  const formStructure = [
    { name: 'descripcion', label: 'Descripción', type: 'text' },
    { name: 'gastosPrevistos', label: 'Gastos Previstos', type: 'text' },
    { name: 'gastosReales', label: 'Gastos Reales', type: 'text' }
  ];

  return (
    <Card>
      <div>
        <div className="overflow-x-auto md:overflow-visible w-full"> {/* Ajustar overflow y ancho */}
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Descripción</th>
                <th className="border border-gray-300 px-4 py-2">Gastos Previstos</th>
                <th className="border border-gray-300 px-4 py-2">Gastos Reales</th>
                <th className="border border-gray-300 px-4 py-2">Diferencia</th>
                <th className="border border-gray-300 px-4 py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, index) => {
                const diferencia = parseFloat(row.gastosPrevistos || 0) - parseFloat(row.gastosReales || 0);
                return (
                  <tr
                    key={index}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                    className="hover:bg-gray-100"
                  >
                    <td className="border border-gray-300 px-4 py-2">{row.descripcion}</td>
                    <td className="border border-gray-300 px-4 py-2">{row.gastosPrevistos}</td>
                    <td className="border border-gray-300 px-4 py-2">{row.gastosReales}</td>
                    <td className="border border-gray-300 px-4 py-2">{diferencia.toFixed(2)}</td>
                    <td className="border border-gray-300 px-4 py-2">
                      {hoveredRowIndex === index && (
                        <MenuModify 
                          onEdit={() => handleEditRow(index)} 
                          onDelete={() => handleDeleteRow(index)} 
                        />
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center my-4">
          <Button onClick={handleAddRow} />
        </div>
        {showForm && (
          <FormTemplate onSubmit={handleFormSubmit} onCancel={() => setShowForm(false)}>
            <h2 className='text-center text-lg md:text-2xl font-bold my-4 text-black'>Agregar a la tabla</h2>
            <div className="flex flex-col space-y-4"> {/* Cambiar a disposición vertical */}
              {formStructure.map(({ name, label, type }, index) => (
                <div key={index} className="flex flex-col">
                  <label className="text-sm md:text-base font-medium mb-1" htmlFor={name}>
                    {label}
                  </label>
                  <input
                    id={name}
                    type={type}
                    placeholder={label}
                    name={name}
                    value={formData[name]}
                    onChange={handleInputChange}
                    className="border-2 rounded px-2 py-1 text-sm md:text-base lg:text-lg w-full"
                  />
                </div>
              ))}
            </div>
          </FormTemplate>
        )}
      </div>
    </Card>
  );
};
