// Dashboard.jsx
import React, { useState, useEffect, useRef } from 'react'; 
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { DbInicio } from '../components/DbInicio';
import { DbPlanificador } from '../components/DbPlanificador';
import { DbAñadirMetas } from '../components/DbAñadirMetas';
import { DbAñadirRecordatorio } from '../components/DbAñadirRecordatorio';
import { FaBell } from "react-icons/fa"; // Importa el ícono de campana
import { FaSignOutAlt } from "react-icons/fa"; // Importar el ícono de cerrar sesión
import { Messages } from '../components/Messages';
import UserName from '../components/UserName';
import logo from '../assets/FinWise_logo.png'; // Asegúrate de que la ruta sea correcta
import { toast } from 'react-toastify';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [activeContent, setActiveContent] = useState('inicio');
  const [refreshTrigger, setRefreshTrigger] = useState(0); // Añadir estado para refrescar
  const [notificaciones, setNotificaciones] = useState([]);
  const [nuevasNotificaciones, setNuevasNotificaciones] = useState(false);
  const [mostrarDropdown, setMostrarDropdown] = useState(false);
  const [loading, setLoading] = useState(true); // Nuevo estado de carga
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token no encontrado');
      }
      const res = await axios.get('https://finwise-gedvf4egduhbajbh.brazilsouth-01.azurewebsites.net/user/dashboard', {
      //const res = await axios.get('http://localhost:3000/dashboard/data', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Datos del dashboard:', res.data);
      setData(res.data.data);
      setLoading(false); // Finaliza la carga cuando los datos están disponibles
    } catch (error) {
      console.error('Error al obtener los datos del dashboard:', error);
      setLoading(false); // Finaliza la carga incluso si hay un error
    }
  };

  const fetchNotificaciones = async () => {
    try {
      const res = await axios.get('https://finwise-gedvf4egduhbajbh.brazilsouth-01.azurewebsites.net/dashboard/notificaciones');
      //const res = await axios.get('http://localhost:3000/dashboard/notificaciones');
      setNotificaciones(res.data.notificaciones || []);
      setNuevasNotificaciones(res.data.notificaciones.some(notif => !notif.leida));
    } catch (error) {
      console.error('Error al obtener las notificaciones:', error);
      toast.error('Error al cargar notificaciones');
    }
  };

  useEffect(() => {
    fetchData();
    //fetchNotificaciones(); // Asegúrate de llamar a esta función para cargar las notificaciones
  }, [refreshTrigger]); // Añadir refreshTrigger como dependencia

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMostrarDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Función para forzar actualización
  const triggerRefresh = () => {
    setRefreshTrigger((prev) => prev + 1);
    // arreglo de actualizacion de datos
    fetchData(); // Asegurarse de obtener los datos actualizados inmediatamente
  };

  const marcarComoLeidas = async () => {
    try {
      const res = await axios.post('https://finwise-gedvf4egduhbajbh.brazilsouth-01.azurewebsites.net/dashboard/notificaciones/marcar-leidas');
      //await axios.post('http://localhost:3000/dashboard/notificaciones/marcar-leidas');
      setNuevasNotificaciones(false); // Desactiva la animación
      fetchNotificaciones(); // Actualiza las notificaciones
    } catch (error) {
      console.error('Error al marcar notificaciones como leídas:', error);
    }
  };

  const toggleDropdown = () => {
    if (nuevasNotificaciones) {
      marcarComoLeidas();
    }
    setMostrarDropdown(!mostrarDropdown);
  };

   //Función para cerrar sesión
   const handleLogout = () => {
    localStorage.removeItem('token'); //Elimina el token del localStorage

    delete axios.defaults.headers.common['Authorization']; //Elimina el token de las solicitudes de axios

    toast.success('Sesión cerrada exitosamente', {
        theme: "colored",
        position: "top-center",
    });

    //Redirige al usuario a la página de login
    navigate('/iniciar-sesion');
  }

  const contentMap = {
    inicio: <DbInicio  resumenFinanzas={data?.resumenFinanzas}onTransactionAdded={triggerRefresh}transacciones={data?.transacciones}/>,
    planificador: <DbPlanificador datosPlanificador={data?.planificador}onDataChanged={triggerRefresh} />,
    'añadir-Metas': <DbAñadirMetas metas={data?.metas}onDataChanged={triggerRefresh} />,
    'añadir-Recordatorios': <DbAñadirRecordatorio recordatorios={data?.recordatorios}onRecordatorioAdded={triggerRefresh} />
  };

  // Formateador de moneda COP
  const formatter = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
  });

  return (
    <div className='content-dashboard flex flex-col md:flex-row w-full'>
      <header className='bg-white fixed top-0 w-full h-16 md:h-20 p-4 flex items-center'>
      <div 
          className="hidden lg:flex w-22 h-18 bg-cover bg-center overflow-hidden shadow-lg" 
          style={{ 
            backgroundImage: `url(${logo})`,
            borderRadius: '0.5rem' // equivalente a rounded-lg
          }}
        />        
        <nav className='flex-1 flex justify-center'>
          <ul className='flex flex-row flex-wrap justify-center space-x-4 text-sm md:text-base'>
            {Object.keys(contentMap).map((key) => (
              <li key={key}>
                <Link
                  to="#"
                  className={`text-[#465FFF] hover:underline hover:decoration-[#465FFF] ${activeContent === key ? 'underline decoration-[#ecf3ff]' : ''}`}
                  onClick={() => setActiveContent(key)}
                >
                  {key.replace('-', ' ')}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center space-x-4">
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="relative text-gray-700 hover:text-gray-900 cursor-pointer"
            >
              <FaBell className={`text-2xl ${nuevasNotificaciones ? 'animate-bounce' : ''}`} />
              {nuevasNotificaciones && (
                <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full"></span>
              )}
            </button>
            {mostrarDropdown && (
              <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-300 rounded shadow-lg cursor-pointer">
                <ul className="divide-y divide-gray-200">
                  {notificaciones.length > 0 ? (
                    notificaciones.map((notificacion, index) => (
                      <li
                        key={index}
                        className={`p-2 hover:bg-gray-100 ${
                          notificacion.leida ? 'bg-gray-200 text-gray-500' : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {notificacion.mensaje}
                      </li>
                    ))
                  ) : (
                    <li className="p-2 text-gray-500">No hay notificaciones</li>
                  )}
                </ul>
              </div>
            )}
          </div>
          <UserName nombreUsuario={data?.nombreUsuario}/>
          <button 
            onClick={handleLogout} 
            className="px-5 py-2 bg-red-500 text-white rounded-3xl hover:bg-red-600 transition-transform transform hover:scale-105 flex items-center justify-center cursor-pointer"
          >
            <FaSignOutAlt size={20} /> {/* Ícono de cerrar sesión */}
          </button>
        </div>
      </header>

      <main className='mt-[4rem] md:mt-[5rem] p-4 md:p-8 bg-[#E5E7EB] min-h-screen w-full'>
        {loading ? ( // Mostrar indicador de carga mientras se obtienen los datos
          <div className="flex justify-center items-center h-full">
            <p className="text-gray-600 text-2xl">Cargando datos...</p>
          </div>
        ) : (
          <>
            <div className='flex items-center'>
              <p className='text-2xl md:text-3xl font-medium '>Balance:</p>
              <p className="text-2xl md:text-3xl font-medium text-blue-700 ml-2">
                {formatter.format(data?.resumenFinanzas?.balance ?? 0)}
              </p>
            </div>
            {contentMap[activeContent]}
          </>
        )}
      </main>

      <div className='fixed bottom-4 right-4'>
        <Messages />
      </div>
    </div>
  );
};

export default Dashboard;
