import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { Button } from './Button';
import { GraphGeneral } from './GraphGeneral';
import { Card } from './Card';
import FormTemplate from './FormTemplate';
import GraphCircule from './GraphCircule';
import Modal from './Modal';
import axios from 'axios';

export const DbInicio = ({ resumenFinanzas, transacciones }) => {
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
  const [showResumenModal, setShowResumenModal] = useState(false);
  const [resumenType, setResumenType] = useState(''); // 'ingresos' o 'gastos'
  const [showTransaccionesModal, setShowTransaccionesModal] = useState(false);

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

  const handleTransactionInputChange = (e) => {
    const { name, value } = e.target;
    setTransactionData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTransactionFormSubmit = async (e) => {
    e.preventDefault();

    const { descripcion, monto, categoria_id } = transactionData;

    if (!descripcion || !monto || !categoria_id) {
      toast.error('Por favor, complete todos los campos', {
        theme: 'colored',
        position: 'top-center'
      });
      return;
    }

    try {
      const nuevaTransaccion = {
        ...transactionData,
        categoria_id: parseInt(categoria_id),
        tipo: transactionType.toLowerCase(),
        fecha: new Date().toISOString()
      };
      await axios.post('http://localhost:3000/dashboard/addTransactions', nuevaTransaccion);
      toast.success('Transacción registrada exitosamente', {
        theme: 'colored',
        position: 'top-center'
      });
      await fetchDashboardData();
    } catch (error) {
      console.error('Error al enviar transacción:', error);
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
    setTransactionData((prev) => ({ ...prev, categoria_id: id }));
    setShowCategoriaDropdown(false);
  };

  const handleOpenResumenModal = (type) => {
    setResumenType(type);
    setShowResumenModal(true);
  };

  const handleCloseResumenModal = () => {
    setShowResumenModal(false);
    setResumenType('');
  };

  const handleOpenTransaccionesModal = () => {
    setShowTransaccionesModal(true);
  };

  const handleCloseTransaccionesModal = () => {
    setShowTransaccionesModal(false);
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

  const ingresosMensuales = resumenFinanzas?.ingresosMensuales ?? [];
  const gastosMensuales = resumenFinanzas?.gastosMensuales ?? [];
  const resumenGastos = resumenFinanzas?.resumenGastos ?? [];
  const resumenIngresos = resumenFinanzas?.resumenIngresos ?? [];

  const selectedCategoria = categorias.find(cat => cat.id === parseInt(transactionData.categoria_id));

  return (
    <>
      <Card>
        {ingresosMensuales.length > 0 && gastosMensuales.length > 0 ? (
          <GraphGeneral
            labels={ingresosMensuales.map(item => item.mes)} 
            ingresosData={ingresosMensuales.map(item => item.total)}
            gastosData={gastosMensuales.map(item => item.total)}
          />
        ) : (
          <p className="text-center text-gray-500">Cargando gráfico general...</p>
        )}

        <div className="relative flex justify-center">
          <Button onClick={toggleSubmenu} />
          {showSubmenu && (
            <div className="absolute bottom-full mb-2 flex flex-col md:flex-row bg-white bg-opacity-75 p-2 rounded shadow-lg">
              <button
                className="mb-2 md:mb-0 mx-2 px-4 py-2 bg-red-500 text-white rounded hover:scale-105 hover:bg-red-600 transition cursor-pointer"
                onClick={() => handleOpenTransactionForm('Gasto')}
              >
                Gastos
              </button>
              <button
                className="mx-2 px-4 py-2 bg-green-500 text-white rounded hover:scale-105 hover:bg-green-600 transition cursor-pointer"
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
                className="border-2 border-dashed rounded px-2 py-1 bg-white/10 font-normal text-gray-300 cursor-not-allowed"
              />
            </div>

            <div className="flex flex-col relative" ref={categoriaRef}>
              <label className="text-sm md:text-base font-medium mb-1">Categoría</label>
              <button
                type="button"
                onClick={() => setShowCategoriaDropdown(!showCategoriaDropdown)}
                className="border-2 rounded px-2 py-2 bg-white text-left"
              >
                {selectedCategoria ? `${selectedCategoria.icono} ${selectedCategoria.nombre}` : 'Seleccione una categoría'}
              </button>

              {showCategoriaDropdown && (
                <ul className="absolute z-10 mt-1 w-[80%] bg-white border border-gray-300 rounded shadow">
                  {categorias.map(cat => (
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
              <label className="text-sm md:text-base font-medium mb-1">Descripción</label>
              <input
                name="descripcion"
                value={transactionData.descripcion}
                onChange={handleTransactionInputChange}
                placeholder="Descripción"
                className="border-2 rounded px-2 py-1 w-full"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm md:text-base font-medium mb-1">Monto</label>
              <input
                name="monto"
                type="number"
                value={transactionData.monto}
                onChange={handleTransactionInputChange}
                className="border-2 rounded px-2 py-1 w-full"
              />
            </div>
          </div>
        </FormTemplate>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full mt-2">
        <Card className="bg-white bg-opacity-75 p-6 rounded shadow-lg">
          <div className="flex flex-col items-center justify-center w-full h-full">
            <h2 className="text-lg md:text-2xl font-bold mb-4">Resumen de Gastos</h2>
            <div className="w-full h-auto">
              {resumenGastos.length ? (
                <GraphCircule
                  data={resumenGastos.map(g => ({
                    name: g.label,
                    value: g.value
                  }))}
                />
              ) : (
                <p className="text-center text-gray-500">No hay datos disponibles.</p>
              )}
            </div>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:scale-105 hover:bg-blue-600 transition cursor-pointer"
              onClick={() => handleOpenResumenModal('gastos')}
            >
              Ver Resumen
            </button>
          </div>
        </Card>

        <Card className="bg-white bg-opacity-75 p-6 rounded shadow-lg">
          <div className="flex flex-col items-center justify-center w-full h-full">
            <h2 className="text-lg md:text-2xl font-bold mb-4">Transacciones</h2>
            <ul className="w-full space-y-2">
              {transacciones?.length ? (
                transacciones.slice(0, 6).map((t) => (
                  <li key={t.id} className="flex justify-between border-b pb-2">
                    <span>{t.descripcion}</span>
                    <span className={t.tipo === 'gasto' ? 'text-red-500' : 'text-green-500'}>
                      {t.tipo === 'gasto' ? '-' : '+'} ${parseFloat(t.monto).toString()}
                    </span>
                  </li>
                ))
              ) : (
                <p className="text-center text-gray-500">No hay transacciones registradas.</p>
              )}
            </ul>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:scale-105 hover:bg-blue-600 transition cursor-pointer"
              onClick={handleOpenTransaccionesModal}
            >
              Ver Todas las Transacciones
            </button>
          </div>
        </Card>

        <Card className="bg-white bg-opacity-75 p-6 rounded shadow-lg">
          <div className="flex flex-col items-center justify-center w-full h-full">
            <h2 className="text-lg md:text-2xl font-bold mb-4">Resumen de Ingresos</h2>
            <div className="w-full h-auto">
              {resumenIngresos.length ? (
                <GraphCircule
                  data={resumenIngresos.map(i => ({
                    name: i.label,
                    value: i.value
                  }))}
                />
              ) : (
                <p className="text-center text-gray-500">No hay datos disponibles.</p>
              )}
            </div>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:scale-105 hover:bg-blue-600 transition cursor-pointer"
              onClick={() => handleOpenResumenModal('ingresos')}
            >
              Ver Resumen
            </button>
          </div>
        </Card>
      </div>

      {showResumenModal && (
        <Modal onClose={handleCloseResumenModal}>
          <div className="p-6">
            <h2 className="text-lg md:text-2xl font-bold mb-4 text-center">
              Resumen de {resumenType === 'gastos' ? 'Gastos' : 'Ingresos'}
            </h2>
            <div className="w-full h-auto mb-6">
              <GraphCircule
                data={(resumenType === 'gastos' ? resumenGastos : resumenIngresos).map(item => ({
                  name: item.label,
                  value: item.value
                }))}
              />
            </div>
            <ul className="space-y-2">
              {(resumenType === 'gastos' ? transacciones.filter(t => t.tipo === 'gasto') : transacciones.filter(t => t.tipo === 'ingreso')).map(t => (
                <li key={t.id} className="flex justify-between border-b pb-2">
                  <span>{t.descripcion}</span>
                  <span className={t.tipo === 'gasto' ? 'text-red-500' : 'text-green-500'}>
                    {t.tipo === 'gasto' ? '-' : '+'} ${parseFloat(t.monto).toString()}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Modal>
      )}

      {showTransaccionesModal && (
        <Modal onClose={handleCloseTransaccionesModal}>
          <div className="p-6">
            <h2 className="text-lg md:text-2xl font-bold mb-4 text-center">Todas las Transacciones</h2>
            <ul className="space-y-2">
              {transacciones?.length ? (
                transacciones.map((t) => (
                  <li key={t.id} className="flex justify-between border-b pb-2">
                    <span>{t.descripcion}</span>
                    <span className={t.tipo === 'gasto' ? 'text-red-500' : 'text-green-500'}>
                      {t.tipo === 'gasto' ? '-' : '+'} ${parseFloat(t.monto).toString()}
                    </span>
                  </li>
                ))
              ) : (
                <p className="text-center text-gray-500">No hay transacciones registradas.</p>
              )}
            </ul>
          </div>
        </Modal>
      )}
    </>
  );
};
