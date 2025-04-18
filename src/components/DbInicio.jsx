import React, { useState, useEffect, useRef } from 'react';
import { Button } from './Button';
import { GraphGeneral } from './GraphGeneral';
import { Card } from './Card';
import FormTemplate from './FormTemplate';
import GraphCircule from './GraphCircule';
import axios from 'axios';

export const DbInicio = ({ resumenFinanzas }) => {
  const [showSubmenu, setShowSubmenu] = useState(false);
  const [showTransactionForm, setShowTransactionForm] = useState(false);
  const [transactionType, setTransactionType] = useState('');
  const [transactionData, setTransactionData] = useState({
    descripcion: '',
    monto: '',
    categoria_id: ''
  });
  const [categorias, setCategorias] = useState([]);
  const [showCategoriaDropdown, setShowCategoriaDropdown] = useState(false);

  const categoriaRef = useRef(null);

  const toggleSubmenu = () => setShowSubmenu(!showSubmenu);
  const closeSubmenu = () => setShowSubmenu(false);

  const handleOpenTransactionForm = async (type) => {
    setTransactionType(type);
    setShowTransactionForm(true);
    try {
      const response = await axios.get(`http://localhost:3000/dashboard/getCategory?tipo=${type.toLowerCase()}`);
      setCategorias(response.data.data || []);
    } catch (error) {
      console.error('Error al cargar categorías:', error);
    }
  };

  const handleTransactionInputChange = (event) => {
    const { name, value } = event.target;
    setTransactionData({ ...transactionData, [name]: value });
  };

  const handleTransactionFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const nuevaTransaccion = {
        ...transactionData,
        tipo: transactionType.toLowerCase(),
        fecha: new Date().toISOString()
      };
      await axios.post('/api/transacciones', nuevaTransaccion);
      alert('Transacción registrada correctamente');
    } catch (error) {
      console.error('Error al enviar transacción:', error);
      alert('Error al registrar la transacción');
    } finally {
      setShowTransactionForm(false);
      setTransactionData({ descripcion: '', monto: '', categoria_id: '' });
    }
  };

  const handleCancelTransactionForm = () => {
    setTransactionData({ descripcion: '', monto: '', categoria_id: '' });
    setShowCategoriaDropdown(false);
    setShowTransactionForm(false);
    
  };

  const handleCategoriaSelect = (id) => {
    setTransactionData({ ...transactionData, categoria_id: id });
    setShowCategoriaDropdown(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (categoriaRef.current && !categoriaRef.current.contains(event.target)) {
        setShowCategoriaDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const ingresosMensuales = resumenFinanzas?.ingresosMensuales || [];
  const gastosMensuales = resumenFinanzas?.gastosMensuales || [];
  const resumenGastos = resumenFinanzas?.resumenGastos || [];
  const resumenIngresos = resumenFinanzas?.resumenIngresos || [];

  return (
    <>
      <Card>
        {ingresosMensuales.length && gastosMensuales.length ? (
          <GraphGeneral ingresos={ingresosMensuales} gastos={gastosMensuales} />
        ) : (
          <p className="text-center text-gray-500">Cargando gráfico general...</p>
        )}

        <div className="relative flex justify-center">
          <Button onClick={toggleSubmenu} />
          {showSubmenu && (
            <div className="absolute bottom-full mb-2 flex flex-col md:flex-row bg-white bg-opacity-75 p-2 rounded shadow-lg">
              <button
                className="mb-2 md:mb-0 mx-2 px-4 py-2 bg-red-500 text-white rounded hover:scale-105 hover:bg-red-600 transition"
                onClick={() => handleOpenTransactionForm('Gasto')}
              >
                Gastos
              </button>
              <button
                className="mx-2 px-4 py-2 bg-green-500 text-white rounded hover:scale-105 hover:bg-green-600 transition"
                onClick={() => handleOpenTransactionForm('Ingreso')}
              >
                Ingresos
              </button>
            </div>
          )}
        </div>
      </Card>

      {showTransactionForm && (
        <FormTemplate onSubmit={handleTransactionFormSubmit} onCancel={handleCancelTransactionForm}>
          <h2 className="text-center text-lg md:text-2xl font-bold my-4 text-black">
            {transactionType === 'Gasto' ? 'Registrar Gasto' : 'Registrar Ingreso'}
          </h2>
          <div className="flex flex-col space-y-4">
           <div className="flex flex-col">
              <label className="text-sm md:text-base font-medium mb-1">Tipo</label>
              <input
                value={transactionType}
                disabled
                className="border-2 border-dashed rounded px-2 py-1 text-sm md:text-base lg:text-lg w-full 
                bg-white/10 font-normal cursor-not-allowed text-gray-300"
     style={{ color: '#D1D5DB' }} 
              />
           </div>

            <div className="flex flex-col relative" ref={categoriaRef}>
              <label htmlFor="categoria_id" className="text-sm md:text-base font-medium mb-1">
                Categoría
              </label>
              <button
                type="button"
                className="border-2 rounded px-2 py-2 text-sm md:text-base lg:text-lg text-left bg-white"
                onClick={() => setShowCategoriaDropdown(!showCategoriaDropdown)}
              >
                {transactionData.categoria_id
                  ? `${categorias.find(cat => cat.id === parseInt(transactionData.categoria_id))?.icono || ''} ${
                      categorias.find(cat => cat.id === parseInt(transactionData.categoria_id))?.nombre || ''
                    }`
                  : 'Seleccione una categoría'}
              </button>

              {showCategoriaDropdown && (
                <ul className="absolute z-10 mt-1 w-[80%] bg-white border border-gray-300 rounded shadow">
                  {categorias.map((cat) => (
                    <li
                      key={cat.id}
                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer flex gap-2 items-center"
                      onClick={() => handleCategoriaSelect(cat.id)}
                    >
                      <span>{cat.icono}</span>
                      <span>{cat.nombre}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="flex flex-col">
              <label htmlFor="descripcion" className="text-sm md:text-base font-medium mb-1">
                Descripción
              </label>
              <input
                id="descripcion"
                name="descripcion"
                value={transactionData.descripcion}
                onChange={handleTransactionInputChange}
                placeholder="Descripción"
                className="border-2 rounded px-2 py-1 text-sm md:text-base lg:text-lg w-full"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="monto" className="text-sm md:text-base font-medium mb-1">
                Monto
              </label>
              <input
                id="monto"
                name="monto"
                type="number"
                value={transactionData.monto}
                onChange={handleTransactionInputChange}
                className="border-2 rounded px-2 py-1 text-sm md:text-base lg:text-lg w-full"
              />
            </div>
          </div>
        </FormTemplate>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full mt-0.1">
        <Card className="bg-white bg-opacity-75 p-6 rounded shadow-lg mt-1 ml-1">
          <div className="flex flex-col items-center justify-center w-full h-full">
            <h2 className="text-lg md:text-2xl font-bold mb-4">Resumen de Gastos</h2>
            <div className="w-full h-auto">
              {resumenGastos.length ? (
                <GraphCircule data={resumenGastos} />
              ) : (
                <p className="text-center text-gray-500">No hay datos disponibles.</p>
              )}
            </div>
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:scale-105 hover:bg-blue-600 transition">
              Ver Resumen
            </button>
          </div>
        </Card>

        <Card className="bg-white bg-opacity-75 p-6 rounded shadow-lg mt-1 ml-1">
          <div className="flex flex-col items-center justify-center w-full h-full">
            <h2 className="text-lg md:text-2xl font-bold mb-4">Transacciones</h2>
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

        <Card className="bg-white bg-opacity-75 p-6 rounded shadow-lg mt-1 ml-1">
          <div className="flex flex-col items-center justify-center w-full h-full">
            <h2 className="text-lg md:text-2xl font-bold mb-4">Resumen de Ingresos</h2>
            <div className="w-full h-auto">
              {resumenIngresos.length ? (
                <GraphCircule data={resumenIngresos} />
              ) : (
                <p className="text-center text-gray-500">No hay datos disponibles.</p>
              )}
            </div>
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:scale-105 hover:bg-blue-600 transition">
              Ver Resumen
            </button>
          </div>
        </Card>
      </div>
    </>
  );
};
