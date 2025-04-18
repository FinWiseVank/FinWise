// Dashboard.jsx
import React, { useState, useEffect } from 'react'; // <-- AGREGA useEffect aquí
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { DbInicio } from '../components/DbInicio';
import { DbPlanificador } from '../components/DbPlanificador';
import { DbAñadirMetas } from '../components/DbAñadirMetas';
import { DbAñadirRecordatorio } from '../components/DbAñadirRecordatorio';
import { FaDollarSign } from "react-icons/fa6";
import { Messages } from '../components/Messages';
import UserName from '../components/UserName'; // ✅ Importación correcta para default export


const Dashboard = () => {
  const [data, setData] = useState(null);
  const [activeContent, setActiveContent] = useState('inicio');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:3000/dashboard/data'  );
        setData(res.data);
        console.log('Datos del usuario:', res.data);
      } catch (error) {
        console.error('Error al obtener los datos del dashboard:', error);
      }
    };

    fetchData();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post('/api/logout');
      navigate('/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const contentMap = {
    inicio: <DbInicio resumenFinanzas={data?.resumenFinanzas} />,
    planificador: <DbPlanificador planificador={data?.planificador} />,
    'añadir-Metas': <DbAñadirMetas metas={data?.metas} />,
    'añadir-Recordatorios': <DbAñadirRecordatorio recordatorios={data?.recordatorios} />
  };

  return (
    <div className='content-dashboard flex flex-col md:flex-row w-full'>
      <header className='bg-[#ffffff] fixed top-0 w-full h-16 md:h-20 p-4 flex items-center'>
        <h1 className='text-black uppercase font-bold text-base md:text-2xl tracking-[1px] md:tracking-[4px]'>JT logo</h1>
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
        <div className="flex items-center space-x-4"> {/* Cambiado a flex-row para alinear en línea */}
          <UserName />
          <button 
            onClick={handleLogout} 
            className="px-0.8 py-0.5 bg-red-500 text-white rounded hover:bg-red-600 transition-transform transform hover:scale-105"
          >
            Cerrar Sesión
          </button>
        </div>
      </header>

      <main className='mt-[4rem] md:mt-[5rem] p-4 md:p-8 bg-[#E5E7EB] min-h-screen w-full'>
        <div className='flex items-center space-x-2'>
          <FaDollarSign className='text-lg md:text-xl' />
          <h1 className='text-base md:text-lg'>Fondos</h1>
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