import React, { useState, useEffect } from 'react';
import { Box } from './Box';
import { Button } from './Button';
import FormTemplate from './FormTemplate';
import { FaBox } from "react-icons/fa";
import { MenuModify } from './MenuModify';
import axios from 'axios';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert'; // Asegúrate de instalar react-confirm-alert
import 'react-confirm-alert/src/react-confirm-alert.css'; // Estilos predeterminados

export const DbAñadirMetas = ({ metas, onDataChanged }) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    titulo: '',
    fechaLimite: '',
    montoFinal: '',
    montoActual: '0',
    estado: 'pendiente'
  });
  const [hoveredMetaIndex, setHoveredMetaIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formMode, setFormMode] = useState('create');
  const [localMetas, setLocalMetas] = useState([]);
  

  useEffect(() => {
    setLocalMetas(metas); // Actualizar datos locales cuando cambien las metas
  }, [metas]);

  const handleAddMeta = () => {
    setFormData({
      titulo: '',
      fechaLimite: '',
      montoFinal: '',
      montoActual: '0',
      estado: 'pendiente'
    });
    setFormMode('create');
    setShowForm(true);
  };

  const handleEditMeta = (index) => {
    const metaToEdit = localMetas[index];
    setFormData({ 
      ...metaToEdit,
      fechaLimite: metaToEdit.fecha_limite.split('T')[0],
      montoActual: metaToEdit.monto_actual.toString(),
      montoFinal: metaToEdit.monto_objetivo.toString() // Asegurar que montoFinal se asigne correctamente
    });
    setFormMode('update');
    setShowForm(true);
  };

  const handleDeleteMeta = async (index) => {
    const metaToDelete = localMetas[index];
    confirmAlert({
      customUI: ({ onClose }) => (
        <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-blue-500">
          <h1 className="text-2xl font-bold text-blue-600">Confirmar eliminación</h1>
          <p className="mt-4 text-gray-700">
            ¿Estás seguro de eliminar la meta <span className="font-semibold">{metaToDelete.nombre}</span>?
          </p>
          <div className="mt-6 flex justify-end space-x-4">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            >
              Cancelar
            </button>
            <button
              onClick={async () => {
                try {
                  await axios.delete('https://finwise-gedvf4egduhbajbh.brazilsouth-01.azurewebsites.net/dashboard/deleteGoal', {
                  //await axios.delete('http://localhost:3000/dashboard/deleteGoal', {
                    data: { id: metaToDelete.meta_id } // Asegurarse de enviar el ID con la clave correcta
                  });
                  toast.success('Meta eliminada correctamente');
                  onDataChanged?.(); // Refrescar datos después de la eliminación
                } catch (error) {
                  console.error('Error al eliminar meta:', error);
                  toast.error(error.response?.data?.message || 'Error al eliminar meta');
                } finally {
                  onClose();
                }
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
            >
              Eliminar
            </button>
          </div>
        </div>
      )
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const token = localStorage.getItem('token'); // Obtener el token del almacenamiento local
      if (!token) {
        throw new Error('Usuario no autenticado. Por favor, inicie sesión nuevamente.');
      }

      const userId = JSON.parse(atob(token.split('.')[1])).id; // Decodificar el token para obtener el userId
      if (!userId) {
        throw new Error('Usuario no autenticado. Por favor, inicie sesión nuevamente.');
      }

      if (formMode === 'create') {
        // Validación creación
        if (!formData.titulo.trim() || !formData.fechaLimite || !formData.montoFinal) {
          throw new Error('Complete todos los campos');
        }

        const montoFinal = parseFloat(formData.montoFinal);
        if (isNaN(montoFinal) || montoFinal < 1000) {
          throw new Error('Monto objetivo debe ser mayor o igual a 1000');
        }

        const payload = {
          usuario_id: userId,
          titulo: formData.titulo.trim(),
          fecha_limite: formData.fechaLimite,
          monto_objetivo: montoFinal
        };

        await axios.post('https://finwise-gedvf4egduhbajbh.brazilsouth-01.azurewebsites.net/dashboard/addGoal', payload);
       // await axios.post('http://localhost:3000/dashboard/addGoal', payload);
        toast.success('¡Meta creada con éxito!');
      } else {
        // Validación actualización
        const montoActual = parseFloat(formData.montoActual);
        if (isNaN(montoActual) || montoActual < 0) {
          throw new Error('Monto actual inválido');
        }

        await axios.put('https://finwise-gedvf4egduhbajbh.brazilsouth-01.azurewebsites.net/dashboard/modifyGoal', {
        //await axios.put('http://localhost:3000/dashboard/modifyGoal', {
          meta_id: formData.meta_id,
          monto_actual: parseFloat(formData.montoActual) + parseFloat(formData.monto_actual)
        });
        toast.success('¡Ahorro actualizado!');
      }

      setShowForm(false);
      onDataChanged?.();
    } catch (error) {
      console.error('Error:', error);
      toast.error(error.message || error.response?.data?.message || 'Error al procesar');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => {
    if (!isLoading) setShowForm(false);
  };

  const handleMouseEnter = (index) => {
    setHoveredMetaIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredMetaIndex(null);
  };

  // Calcular progreso
  const calcularProgreso = (meta) => {
    const montoActual = parseFloat(meta.monto_actual) || 0; // Validar monto_actual
    const montoFinal = parseFloat(meta.monto_objetivo) || 1; // Evitar división por 0
    const progreso = (montoActual / montoFinal) * 100;

    return {
      porcentaje: Math.min(progreso, 100),
      estado: progreso >= 100 ? 'Completado' : 'En progreso',
      clase: progreso >= 100 ? 'bg-green-500' : 'bg-blue-500',
    };
  };

  return (
    <div className="p-4">
      <h1 className="text-center text-2xl font-bold my-4 text-blue-600">Mis Metas de Ahorro</h1>
      
      {(!localMetas || localMetas.length === 0) && (
        <div className="text-center py-8">
          <FaBox className="mx-auto text-5xl text-gray-300 mb-4" />
          <p className="text-gray-500">No tienes metas creadas aún</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {localMetas?.map((meta, index) => {
          if (!meta || !meta.meta_id) { // Cambiar validación para usar meta.meta_id
            console.warn(`Meta inválida en el índice ${index}:`, meta);
            return null; // Ignorar metas inválidas
          }

          const { porcentaje, estado, clase } = calcularProgreso(meta);
          return (
            <div
              key={meta.meta_id} // Usar meta.meta_id como key única
              className="relative group"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <Box className="h-full">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-lg">{meta.nombre || 'Sin título'}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    estado === 'Completado' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {estado}
                  </span>
                </div>
                
                <div className="mt-3 space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Objetivo:</span>
                    <span className="font-medium">${parseFloat(meta.monto_objetivo || 0).toString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Ahorrado:</span>
                    <span className="font-medium">${parseFloat(meta.monto_actual || 0).toString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Fecha límite:</span>
                    <span>{meta.fecha_limite ? new Date(meta.fecha_limite).toLocaleDateString() : 'Sin fecha'}</span>
                  </div>
                </div>

                <div className="mt-3">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`${clase} h-2 rounded-full`} 
                      style={{ width: `${porcentaje}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>{porcentaje.toFixed(0)}% completado</span>
                    <span>${parseFloat((meta.monto_objetivo || 0) - (meta.monto_actual || 0)).toString()} restantes</span>
                  </div>
                </div>
              </Box>

              {hoveredMetaIndex === index && (
                <div className="absolute inset-0  rounded-lg flex items-center justify-center">
                  <MenuModify 
                    onEdit={() => handleEditMeta(index)} 
                    onDelete={() => handleDeleteMeta(index)} 
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="text-center">
        <Button 
          onClick={handleAddMeta} 
          disabled={isLoading}
          className="px-6 py-2"
        >
          {isLoading ? 'Cargando...' : '+ Crear Nueva Meta'}
        </Button>
      </div>

      {showForm && (
        <FormTemplate 
          onSubmit={handleFormSubmit} 
          onCancel={handleCancel}
          isSubmitting={isLoading}
        >
          <h2 className="text-xl font-bold text-center mb-4">
            {formMode === 'create' ? 'Nueva Meta de Ahorro' : 'Actualizar Ahorro'}
          </h2>
          
          <div className="space-y-4">
            {formMode === 'create' ? (
              <>
                <div>
                  <label className="block text-sm font-medium mb-1">Título de la meta</label>
                  <input
                    type="text"
                    name="titulo"
                    value={formData.titulo}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="Ej: Viaje a Europa"
                    required
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Monto objetivo</label>
                  <input
                    type="number"
                    name="montoFinal"
                    value={formData.montoFinal}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="Ej: 5000000"
                    min="1000" // Cambiar validación mínima a 1000
                    step="100"
                    required
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Fecha límite</label>
                  <input
                    type="date"
                    name="fechaLimite"
                    value={formData.fechaLimite}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-md"
                    min={new Date().toISOString().split('T')[0]}
                    required
                    disabled={isLoading}
                  />
                </div>
              </>
            ) : (
              <>
                <div className="bg-gray-50 p-3 rounded-md mb-3">
                  <h3 className="font-semibold">{formData.titulo}</h3>
                  <div className="flex justify-between text-sm mt-1">
                    <span>Objetivo: ${parseFloat(formData.montoFinal || 0).toLocaleString()}</span> {/* Mostrar objetivo correctamente */}
                    <span>Fecha: {new Date(formData.fechaLimite).toLocaleDateString()}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Cantidad a añadir</label>
                  <input
                    type="number"
                    name="montoActual"
                    value={formData.montoActual}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="Ej: 200000"
                    min="0"
                    step="1000"
                    required
                    disabled={isLoading}
                  />
                </div>
              </>
            )}
          </div>
        </FormTemplate>
      )}
    </div>
  );
};