import React, { useState } from 'react';
import { Box } from './Box';
import { Button } from './Button';
import FormTemplate from './FormTemplate';
import { FaBox } from "react-icons/fa";

export const DbAñadirMetas = () => {
  const [showForm, setShowForm] = useState(false);
  const [metaData, setMetaData] = useState([]); // Cambiar a un array para almacenar múltiples metas
  const [formData, setFormData] = useState({
    titulo: '',
    fechaLimite: '',
    montoFinal: '', // Nuevo campo
  });

  const handleAddMeta = () => {
    setShowForm(true);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setMetaData([...metaData, formData]); // Agregar la nueva meta al array
    setShowForm(false);
    setFormData({
      titulo: '',
      fechaLimite: '',
      montoFinal: '',
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  return (
    <div>
      <h1 className='text-center text-2xl font-bold my-4 text-blue-500'>Añadir Metas</h1>
      {!metaData.length && (
        <div className="flex justify-center mb-4">
          <FaBox className='text-5xl text-blue-500' />
        </div>
      )}
      <div className="flex flex-col items-center">
        <div className="flex flex-wrap justify-center space-x-4">
          {metaData.map((meta, index) => (
            <Box key={index} className="flex-shrink-0">
              <h2 className="text-xl font-bold text-black">{meta.titulo}</h2>
              <p className="text-sm text-gray-500">Fecha Límite: {meta.fechaLimite}</p>
              <p className="text-sm text-gray-500">Monto Final: ${meta.montoFinal}</p>
            </Box>
          ))}
        </div>
        <div className="mt-4">
          <Button onClick={handleAddMeta} />
        </div>
        {showForm && (
          <FormTemplate onSubmit={handleFormSubmit} onCancel={handleCancel}>
            <h2 className='text-center text-2xl font-bold my-4 text-black'>Llenar Meta</h2>
            <label className="block text-sm font-bold mb-2" htmlFor="titulo">
              Título
            </label>
            <input
              type="text"
              id="titulo"
              name="titulo"
              placeholder="Ingrese el título de la meta"
              value={formData.titulo}
              onChange={handleInputChange}
              className="border-2 rounded px-2 py-1 mb-4"
            />
            <label className="block text-sm font-bold mb-2" htmlFor="fechaLimite">
              Fecha Límite
            </label>
            <input
              type="date"
              id="fechaLimite"
              name="fechaLimite"
              value={formData.fechaLimite}
              onChange={handleInputChange}
              className="border-2 rounded px-2 py-1 mb-4"
            />
            <label className="block text-sm font-bold mb-2" htmlFor="montoFinal">
              Monto
            </label>
            <input
              type="number"
              id="montoFinal"
              name="montoFinal"
              placeholder="Ingrese el monto final de la meta"
              value={formData.montoFinal}
              onChange={handleInputChange}
              className="border-2 rounded px-2 py-1 mb-4"
            />
          </FormTemplate>
        )}
      </div>
    </div>
  );
};
