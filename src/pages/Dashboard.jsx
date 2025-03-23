import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DbInicio } from '../components/DbInicio';
import { DbPlanificador } from '../components/DbPlanificador';
import { DbAñadirMetas } from '../components/DbAñadirMetas';
import { DbAñadirRecordatorio } from '../components/DbAñadirRecordatorio';
import { FaDollarSign } from "react-icons/fa6";
import { Messages } from '../components/Messages';
import { ModeNigth } from '../components/ModeNigth'; // Importa el componente Modenigth

const Dashboard = () => {
  const [activeContent, setActiveContent] = useState('inicio');

  const renderContent = () => {
    switch (activeContent) {
      case 'inicio':
        return <DbInicio />;
      case 'planificador':
        return <DbPlanificador />;
      case 'añadir-Metas':
        return <DbAñadirMetas />;
      case 'añadir-Recordatorios':
        return <DbAñadirRecordatorio />;
      default:
        return <DbInicio />;
    }
  };

  return (  
    <div className='content-dashboard'>
      <header>
        <div className='bg-[#ffffff] fixed top-0 w-full h-20 p-8 flex items-center '>
          <div className='text-black uppercase font-bold text-2xl tracking-[4px]'>
            <h1>JT logo</h1>
          </div>

          {/* Barra de navegación */}
          <nav className='flex-1 flex justify-center'>
            <ul className='flex space-x-4'>
              <li>
                <Link
                  to="#"
                  className={`text-[#465FFF] hover:underline hover:decoration-[#465FFF] ${activeContent === 'inicio' ? 'underline decoration-[#ecf3ff]' : ''}`}
                  onClick={() => setActiveContent('inicio')}
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className={`text-[#465FFF] hover:underline hover:decoration-[#465FFF] ${activeContent === 'planificador' ? 'underline decoration-[#ecf3ff]' : ''}`}
                  onClick={() => setActiveContent('planificador')}
                >
                  Planificador
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className={`text-[#465FFF] hover:underline hover:decoration-[#465FFF] ${activeContent === 'añadir-Metas' ? 'underline decoration-[#ecf3ff]' : ''}`}
                  onClick={() => setActiveContent('añadir-Metas')}
                >
                  Añadir Metas
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className={`text-[#465FFF] hover:underline hover:decoration-[#465FFF] ${activeContent === 'añadir-Recordatorios' ? 'underline decoration-[#ecf3ff]' : ''}`}
                  onClick={() => setActiveContent('añadir-Recordatorios')}
                >
                  Añadir Recordatorios
                </Link>
              </li>
            </ul>
          </nav>
          <ModeNigth /> {/* Añade el componente Modenigth aquí */}
        </div>
      </header>

      {/* Contenido principal del Dashboard */}
      <main className='mt-[5rem] p-8 bg-[#E5E7EB] min-h-screen'>
        {/* Ajuste de mt-[5rem] para evitar superposición */}
        <div className='flex justify-left'>
          <FaDollarSign />
          <h1>Fondos</h1>
        </div>
        {renderContent()}
      </main>

      {/* Botón de mensajería fijo */}
      <div className='fixed bottom-4 right-4'>
        <Messages />
      </div>
    </div>
  );
};

export default Dashboard;