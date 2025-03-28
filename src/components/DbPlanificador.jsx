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
    gastosReales: ''
  });

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

  const formStructure = [
    { name: 'descripcion', label: 'Descripción', type: 'text' },
    { name: 'gastosPrevistos', label: 'Gastos Previstos', type: 'text' },
    { name: 'gastosReales', label: 'Gastos Reales', type: 'text' }
  ];

  return (
    <Card>
      <div>
        <div className="overflow-x-auto md:overflow-visible w-full"> {/* Ajustar overflow y ancho */}
          <Table title="Planificador de Gastos" data={tableData} />
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
