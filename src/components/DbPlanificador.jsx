import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import FormTemplate from './FormTemplate';
import { Card } from './Card';
import { MenuModify } from './MenuModify';
import axios from 'axios';
import { toast } from 'react-toastify';

export const DbPlanificador = ({ datosPlanificador, onDataChanged }) => {
  const [tableData, setTableData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [formData, setFormData] = useState({
    descripcion: '',
    gastosPrevistos: '',
    gastosReales: ''
  });
  const [hoveredRowIndex, setHoveredRowIndex] = useState(null);

  useEffect(() => {
    if (Array.isArray(datosPlanificador)) {
      const formattedData = datosPlanificador.map(item => ({
        ...item,
        monto_previsto: item.monto_previsto ? Number(item.monto_previsto) : 0,
        gastos_reales: item.gastos_reales ? Number(item.gastos_reales) : 0
      }));
      setTableData(formattedData);
    }
  }, [datosPlanificador]);

  const handleAddRow = () => {
    setFormData({
      descripcion: '',
      gastosPrevistos: '',
      gastosReales: ''
    });
    setEditIndex(null);
    setShowForm(true);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const { descripcion, gastosPrevistos, gastosReales } = formData;

    // Validación mejorada
    if (!descripcion.trim() || gastosPrevistos === '' || gastosReales === '') {
      toast.error('Por favor completa todos los campos.');
      return;
    }

    const previsto = parseFloat(gastosPrevistos);
    const real = parseFloat(gastosReales);

    if (isNaN(previsto) || isNaN(real)) {
      toast.error('Los valores de gastos deben ser números válidos.');
      return;
    }

    const payload = {
      descripcion,
      monto_previsto: previsto,
      gastos_reales: real,
      diferencia: previsto - real
    };

    try {
      let response;
      if (editIndex !== null) {
        const id = tableData[editIndex].id;
        response = await axios.put('http://localhost:3000/dashboard/modifyExpensePlanner', {
          ...payload,
          id
        });
      } else {
        response = await axios.post('http://localhost:3000/dashboard/addExpensePlanner', payload);
      }

      const updatedItem = {
        ...response.data,
        monto_previsto: Number(response.data.monto_previsto),
        gastos_reales: Number(response.data.gastos_reales)
      };

      if (editIndex !== null) {
        setTableData(prev => prev.map((row, i) => (i === editIndex ? updatedItem : row)));
        toast.success('Gasto actualizado correctamente');
      } else {
        setTableData(prev => [...prev, updatedItem]);
        toast.success('Gasto agregado correctamente');
      }

      setShowForm(false);
      setFormData({ descripcion: '', gastosPrevistos: '', gastosReales: '' });
      setEditIndex(null);
      if (onDataChanged) onDataChanged();
    } catch (error) {
      console.error('Error en el formulario:', error);
      toast.error(error.response?.data?.message || 'Error al guardar datos');
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    // Si es un campo numérico, permitir solo números
    const processedValue = (name === 'gastosPrevistos' || name === 'gastosReales') 
      ? value === '' ? '' : value.replace(/[^0-9.]/g, '')
      : value;
    setFormData({ ...formData, [name]: processedValue });
  };

  const handleEditRow = (index) => {
    const rowToEdit = tableData[index];
    setFormData({
      descripcion: rowToEdit.descripcion || '',
      gastosPrevistos: rowToEdit.monto_previsto?.toString() || '',
      gastosReales: rowToEdit.gastos_reales?.toString() || ''
    });
    setEditIndex(index);
    setShowForm(true);
  };

  const handleDeleteRow = async (index) => {
    const rowToDelete = tableData[index];
    try {
      await axios.delete('http://localhost:3000/dashboard/deleteExpensePlanner', {
        data: { id: rowToDelete.id }
      });
      setTableData(prev => prev.filter((_, i) => i !== index));
      toast.success('Registro eliminado correctamente');
      if (onDataChanged) onDataChanged();
    } catch (error) {
      console.error('Error al eliminar registro:', error);
      toast.error(error.response?.data?.message || 'Error al eliminar registro');
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
    { name: 'gastosPrevistos', label: 'Gastos Previstos', type: 'text', inputMode: 'decimal' },
    { name: 'gastosReales', label: 'Gastos Reales', type: 'text', inputMode: 'decimal' }
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
                const diferencia = (row.monto_previsto || 0) - (row.gastos_reales || 0);
                return (
                  <tr
                    key={index}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                    className="hover:bg-gray-100"
                  >
                    <td className="border border-gray-300 px-4 py-2">{row.descripcion}</td>
                    <td className="border border-gray-300 px-4 py-2">${parseFloat(row.monto_previsto || 0).toString()}</td>
                    <td className="border border-gray-300 px-4 py-2">${parseFloat(row.gastos_reales || 0).toString()}</td>
                    <td className="border border-gray-300 px-4 py-2">${parseFloat(diferencia).toString()}</td>
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
            <h2 className="text-center text-lg md:text-2xl font-bold my-4 text-black">
              {editIndex !== null ? 'Editar gasto' : 'Agregar gasto'}
            </h2>
            <div className="flex flex-col space-y-4">
              {formStructure.map(({ name, label, type, inputMode }, index) => (
                <div key={index} className="flex flex-col">
                  <label className="text-sm md:text-base font-medium mb-1" htmlFor={name}>
                    {label}
                  </label>
                  <input
                    id={name}
                    type={type}
                    inputMode={inputMode}
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