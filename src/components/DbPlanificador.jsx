import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import FormTemplate from './FormTemplate';
import { Card } from './Card';
import { MenuModify } from './MenuModify';
import axios from 'axios';
import { toast } from 'react-toastify';

export const DbPlanificador = ({ datosPlanificador }) => {
  const [tableData, setTableData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editIndex, setEditIndex] = useState(null); // null = nuevo, número = edición
  const [formData, setFormData] = useState({
    descripcion: '',
    gastosPrevistos: '',
    gastosReales: ''
  });
  const [hoveredRowIndex, setHoveredRowIndex] = useState(null);

  useEffect(() => {
    if (Array.isArray(datosPlanificador)) {
      setTableData(datosPlanificador);
    }
  }, [datosPlanificador]);

  const handleAddRow = () => {
    setShowForm(true);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const payload = {
      id: editIndex !== null ? tableData[editIndex].id : undefined, // Añade el ID al payload
      descripcion: formData.descripcion,
      monto_previsto: parseFloat(formData.gastosPrevistos),
      gastos_reales: parseFloat(formData.gastosReales),
      diferencia: parseFloat(formData.gastosPrevistos) - parseFloat(formData.gastosReales)
    };
  
    try {
      if (editIndex !== null) {
        // PUT request con ID en el body
        const response = await axios.put('http://localhost:3000/dashboard/modifyExpensePlanner', payload);
        
        setTableData((prev) =>
          prev.map((row, i) => (i === editIndex ? response.data : row))
        );
        toast.success('Gastos actualizados correctamente');
      } else {
        const response = await axios.post('http://localhost:3000/dashboard/addExpensePlanner', payload);
        setTableData((prev) => [...prev, response.data]);
        toast.success('Gastos añadidos correctamente');
      }
  
      setShowForm(false);
      setFormData({ descripcion: '', gastosPrevistos: '', gastosReales: '' });
      setEditIndex(null);
    } catch (error) {
      console.error('Error en el formulario:', error);
      toast.error('Error al guardar datos');
    }
  };
  
  

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEditRow = (index) => {
    const rowToEdit = tableData[index];
    setFormData({ 
      descripcion: rowToEdit.descripcion,
      gastosPrevistos: rowToEdit.monto_previsto,
      gastosReales: rowToEdit.gastos_reales
    });
    setEditIndex(index);
    setShowForm(true);
  };

  const handleDeleteRow = async (index) => {
    const rowToDelete = tableData[index];
    try {
      // DELETE request con ID en el body
      await axios.delete('http://localhost:3000/dashboard/deleteExpensePlanner', {
        data: { id: rowToDelete.id } // Axios requiere el campo 'data' para DELETE
      });
      setTableData((prev) => prev.filter((_, i) => i !== index));
      toast.success('Fila eliminada correctamente');
    } catch (error) {
      console.error('Error al eliminar fila:', error);
      toast.error('Error al eliminar fila');
    }
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
        <div className="overflow-x-auto md:overflow-visible w-full">
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
                const diferencia = parseFloat(row.monto_previsto || 0) - parseFloat(row.gastos_reales || 0);
                return (
                  <tr
                    key={index}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                    className="hover:bg-gray-100"
                  >
                    <td className="border border-gray-300 px-4 py-2">{row.descripcion}</td>
                    <td className="border border-gray-300 px-4 py-2">{row.monto_previsto}</td>
                    <td className="border border-gray-300 px-4 py-2">{row.gastos_reales}</td>
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
            <h2 className="text-center text-lg md:text-2xl font-bold my-4 text-black">Agregar a la tabla</h2>
            <div className="flex flex-col space-y-4">
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
