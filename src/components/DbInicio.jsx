import React, { useState } from 'react'
import { Button } from './Button'
import { GraphGeneral } from './GraphGeneral'
import clsx from 'clsx'
import { Card } from './Card'
import FormTemplate from './FormTemplate'; // Importar FormTemplate
import GraphCircule from './GraphCircule'; // Importar GraphCircule


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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full mt-0.1"> {/* Reducido margen superior */}
        <Card className="bg-white bg-opacity-75 p-6 rounded shadow-lg mt-1 ml-1"> {/* Añadido margen izquierdo */}
          <div className='flex flex-col items-center justify-center w-full h-full'>
            <h2 className='text-lg md:text-2xl font-bold mb-4'>Resumen de Gastos</h2>
            <div className="w-full h-auto">
              <GraphCircule data={[
                { name: 'Alquiler', value: 500 },
                { name: 'Comida', value: 300 },
                { name: 'Transporte', value: 200 },
              ]} />
            </div>
            <button className='mt-4 px-4 py-2 bg-blue-500 text-white rounded transition-transform transform hover:scale-105 hover:bg-blue-600 cursor-pointer'>
              Ver Resumen
            </button>
          </div>
        </Card>
        <Card className="bg-white bg-opacity-75 p-6 rounded shadow-lg mt-1 ml-1"> {/* Añadido margen izquierdo */}
          <div className='flex flex-col items-center justify-center w-full h-full'>
            <h2 className='text-lg md:text-2xl font-bold mb-4'>Transacciones</h2>
            <ul className="w-full space-y-2">
              <li className="flex justify-between border-b pb-2">
                <span>Compra en supermercado</span>
                <span className="text-red-500">- $50</span>
              </li>
              <li className="flex justify-between border-b pb-2">
                <span>Pago de salario</span>
                <span className="text-green-500">+ $1000</span>
              </li>
              <li className="flex justify-between border-b pb-2">
                <span>Transporte</span>
                <span className="text-red-500">- $20</span>
              </li>
              <li className="flex justify-between">
                <span>Freelance</span>
                <span className="text-green-500">+ $500</span>
              </li>
            </ul>
          </div>
        </Card>
        <Card className="bg-white bg-opacity-75 p-6 rounded shadow-lg mt-1 ml-1"> {/* Añadido margen izquierdo */}
          <div className='flex flex-col items-center justify-center w-full h-full'>
            <h2 className='text-lg md:text-2xl font-bold mb-4'>Resumen de Ingresos</h2>
            <div className="w-full h-auto">
              <GraphCircule data={[
                { name: 'Salario', value: 1000 },
                { name: 'Freelance', value: 500 },
                { name: 'Inversiones', value: 300 },
              ]} />
            </div>
            <button className='mt-4 px-4 py-2 bg-blue-500 text-white rounded transition-transform transform hover:scale-105 hover:bg-blue-600 cursor-pointer'>
              Ver Resumen
            </button>
          </div>
        </Card>
      </div>
    </>
  )
}
