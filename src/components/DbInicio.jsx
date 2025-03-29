import React, { useState } from 'react'
import { Button } from './Button'
import { GraphGeneral } from './GraphGeneral'
import clsx from 'clsx'
import { Card } from './Card'
import FormTemplate from './FormTemplate'; // Importar FormTemplate

export const DbInicio = () => {
  const [showSubmenu, setShowSubmenu] = useState(false);
  const [showTransactionForm, setShowTransactionForm] = useState(false);
  const [transactionType, setTransactionType] = useState('');
  const [transactionData, setTransactionData] = useState({
    descripcion: '',
    monto: '',
    fecha: ''
  });

  const toggleSubmenu = () => {
    setShowSubmenu(!showSubmenu);
  };

  const closeSubmenu = () => {
    setShowSubmenu(false);
  };

  const handleOpenTransactionForm = (type) => {
    setTransactionType(type);
    setShowTransactionForm(true);
  };

  const handleTransactionInputChange = (event) => {
    const { name, value } = event.target;
    setTransactionData({ ...transactionData, [name]: value });
  };

  const handleTransactionFormSubmit = (event) => {
    event.preventDefault();
    console.log(`Nueva transacción (${transactionType}):`, transactionData);
    setShowTransactionForm(false);
    setTransactionData({
      descripcion: '',
      monto: '',
      fecha: ''
    });
  };

  const handleCancelTransactionForm = () => {
    setShowTransactionForm(false);
  };

  return (
    <>
      <Card>
        <GraphGeneral />
        <div className='relative flex justify-center'>
          <Button onClick={toggleSubmenu} />
          {showSubmenu && (
            <div className='absolute bottom-full mb-2 flex flex-col md:flex-row bg-white bg-opacity-75 p-2 rounded shadow-lg'>
              <button
                className='mb-2 md:mb-0 mx-2 px-4 py-2 bg-red-500 text-white rounded transition-transform transform hover:scale-105 hover:bg-red-600 cursor-pointer'
                onClick={() => handleOpenTransactionForm('Gastos')}
              >
                Gastos
              </button>
              <button
                className='mx-2 px-4 py-2 bg-green-500 text-white rounded transition-transform transform hover:scale-105 hover:bg-green-600 cursor-pointer'
                onClick={() => handleOpenTransactionForm('Ingresos')}
              >
                Ingresos
              </button>
            </div>
          )}
        </div>
      </Card>
      {showTransactionForm && (
        <FormTemplate onSubmit={handleTransactionFormSubmit} onCancel={handleCancelTransactionForm}>
          <h2 className='text-center text-lg md:text-2xl font-bold my-4 text-black'>
            {transactionType === 'Gastos' ? 'Registrar Gasto' : 'Registrar Ingreso'}
          </h2>
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col">
              <label className="text-sm md:text-base font-medium mb-1" htmlFor="descripcion">
                Descripción
              </label>
              <input
                id="descripcion"
                type="text"
                placeholder="Descripción"
                name="descripcion"
                value={transactionData.descripcion}
                onChange={handleTransactionInputChange}
                className="border-2 rounded px-2 py-1 text-sm md:text-base lg:text-lg w-full"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm md:text-base font-medium mb-1" htmlFor="monto">
                Monto
              </label>
              <input
                id="monto"
                type="number"
                placeholder="Monto"
                name="monto"
                value={transactionData.monto}
                onChange={handleTransactionInputChange}
                className="border-2 rounded px-2 py-1 text-sm md:text-base lg:text-lg w-full"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm md:text-base font-medium mb-1" htmlFor="fecha">
                Fecha
              </label>
              <input
                id="fecha"
                type="date"
                name="fecha"
                value={transactionData.fecha}
                onChange={handleTransactionInputChange}
                className="border-2 rounded px-2 py-1 text-sm md:text-base lg:text-lg w-full"
              />
            </div>
          </div>
        </FormTemplate>
      )}
      <Card>
        <div className='flex flex-col items-center justify-center w-full h-full bg-white bg-opacity-75 p-4 rounded shadow-lg'>
          <h2 className='text-lg md:text-2xl font-bold mb-4'>Resumen de Gastos</h2>
          <p className='text-sm md:text-base text-gray-600'>Aquí puedes ver un resumen de tus gastos e ingresos.</p>
        </div>
        <div className='flex flex-col items-center justify-center w-full h-full bg-white bg-opacity-75 p-4 rounded shadow-lg mt-4'>
          <h2 className='text-lg md:text-2xl font-bold mb-4'>Resumen de Ingresos</h2>
          <p className='text-sm md:text-base text-gray-600'>Aquí puedes ver un resumen de tus ingresos.</p>   
        </div>
      </Card>
    </>
  )
}
