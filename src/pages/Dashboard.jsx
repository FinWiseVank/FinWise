import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DbInicio } from '../components/DbInicio';
import { DbPlanificador } from '../components/DbPlanificador';
import { DbAñadirMetas } from '../components/DbAñadirMetas';
import { DbAñadirRecordatorio } from '../components/DbAñadirRecordatorio';
import { FaDollarSign } from "react-icons/fa6";
import { Messages } from '../components/Messages';
import { ModeNigth } from '../components/ModeNigth'; // Importa el componente Modenigth

export const Dashboard = () => {
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
        <div className='bg-[#011627] fixed top-0 w-full h-20 p-8 flex items-center '>
          <div className='text-white uppercase font-bold text-2xl tracking-[4px]'>
            <h1>JT logo</h1>
          </div>

          {/* Barra de navegación */}
          <nav className='flex-1 flex justify-center'>
            <ul className='flex space-x-4'>
              <li>
                <Link
                  to="#"
                  className={`text-white hover:underline hover:decoration-white ${activeContent === 'inicio' ? 'underline decoration-white' : ''}`}
                  onClick={() => setActiveContent('inicio')}
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className={`text-white hover:underline hover:decoration-white ${activeContent === 'planificador' ? 'underline decoration-white' : ''}`}
                  onClick={() => setActiveContent('planificador')}
                >
                  Planificador
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className={`text-white hover:underline hover:decoration-white ${activeContent === 'añadir-Metas' ? 'underline decoration-white' : ''}`}
                  onClick={() => setActiveContent('añadir-Metas')}
                >
                  Añadir Metas
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className={`text-white hover:underline hover:decoration-white ${activeContent === 'añadir-Recordatorios' ? 'underline decoration-white' : ''}`}
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
      <main className='mt-20 p-8'>
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
