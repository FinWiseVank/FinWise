// Dashboard.jsx
import React, { useState, useEffect } from 'react'; 
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { DbInicio } from '../components/DbInicio';
import { DbPlanificador } from '../components/DbPlanificador';
import { DbAñadirMetas } from '../components/DbAñadirMetas';
import { DbAñadirRecordatorio } from '../components/DbAñadirRecordatorio';
import { FaDollarSign } from "react-icons/fa6";
import { Messages } from '../components/Messages';
import UserName from '../components/UserName';
import logo from '../assets/FinWise_logo.png'; // Asegúrate de que la ruta sea correcta

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [activeContent, setActiveContent] = useState('inicio');
  const [refreshTrigger, setRefreshTrigger] = useState(0); // Añadir estado para refrescar
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await axios.get('http://localhost:3000/dashboard/data');
      setData(res.data.data);
      console.log('Datos del dashboard', res.data.data);
    } catch (error) {
      console.error('Error al obtener los datos del dashboard:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [refreshTrigger]); // Añadir refreshTrigger como dependencia

  // Función para forzar actualización
  const triggerRefresh = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  const handleLogout = async () => {
    try {
      await axios.post('/api/logout');
      localStorage.removeItem('authToken'); // Ejemplo para localStorage
      sessionStorage.removeItem('authToken'); // Ejemplo para sessionStorage
      navigate('/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const contentMap = {
    inicio: <DbInicio  resumenFinanzas={data?.resumenFinanzas}onTransactionAdded={triggerRefresh}transacciones={data?.transacciones}/>,
    planificador: <DbPlanificador datosPlanificador={data?.planificador}onDataChanged={triggerRefresh} />,
    'añadir-Metas': <DbAñadirMetas metas={data?.metas}onDataChanged={triggerRefresh} />,
    'añadir-Recordatorios': <DbAñadirRecordatorio recordatorios={data?.recordatorios} />
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
          <UserName nombreUsuario={data?.nombreUsuario}/>
          <button 
            onClick={handleLogout} 
            className="px-0.8 py-0.5 bg-red-500 text-white rounded hover:bg-red-600 transition-transform transform hover:scale-105"
          >
            Cerrar Sesión
          </button>
        </div>
      </header>

      <main className='mt-[4rem] md:mt-[5rem] p-4 md:p-8 bg-[#E5E7EB] min-h-screen w-full'>
      <div className='flex items-center'>
  <p className='text-2xl md:text-3xl font-medium '>Balance:</p>
  {!data ? (
    <p className="text-gray-600 text-2xl md:text-3xl font-medium">Cargando...</p>
  ) : (
    <p className="text-2xl md:text-3xl font-medium text-blue-700 ml-2">
      {formatter.format(data.resumenFinanzas?.balance ?? 0)}
    </p>
  )}
</div>



        {contentMap[activeContent]}
      </main>

      <div className='fixed bottom-4 right-4'>
        <Messages />
      </div>
    </div>
  );
};

export default Dashboard;
