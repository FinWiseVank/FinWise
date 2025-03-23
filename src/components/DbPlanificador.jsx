import React, { useState } from 'react';
import { Table } from './Table';
import { Button } from './Button';
import FormTemplate from './FormTemplate';
import { Card } from './Card';

export const DbPlanificador = () => {
  const [tableData, setTableData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    descripcion: '',
    gastosPrevistos: '',
    gastosReales: '',
    diferencia: ''
  });

  const handleAddRow = () => {
    setShowForm(true);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setTableData([...tableData, formData]);
    setShowForm(false);
    setFormData({
      descripcion: '',
      gastosPrevistos: '',
      gastosReales: '',
      diferencia: ''
    });
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const formStructure = [
    { name: 'descripcion', label: 'Descripción', type: 'text' },
    { name: 'gastosPrevistos', label: 'Gastos Previstos', type: 'text' },
    { name: 'gastosReales', label: 'Gastos Reales', type: 'text' },
    { name: 'diferencia', label: 'Diferencia', type: 'text' },
  ];

  return (
    <Card>
    <div>
      <Table title="Planificador de Gastos" data={tableData} />
      <div className="flex justify-center my-4">
        <Button onClick={handleAddRow} />
      </div>
      {showForm && (
        <FormTemplate onSubmit={handleFormSubmit} onCancel={handleCancel}>
          <h2 className='text-center text-2xl font-bold my-4 text-Black'>Agregar a la tabla</h2>
          {formStructure.map((field, index) => (
            <input
              key={index}
              type={field.type}
              placeholder={field.label}
              name={field.name}
              value={formData[field.name]}
              onChange={handleInputChange}
              className="border-2 rounded px-2 py-1"
            />
          ))}
        </FormTemplate>
      )}
    </div>
    </Card>
  );
};
