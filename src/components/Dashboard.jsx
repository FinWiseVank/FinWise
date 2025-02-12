import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { DbInicio } from './DbInicio'
import { DbPlanificador } from './DbPlanificador'
import { DbAñadirMetas } from './DbAñadirMetas'
import { DbAñadirRecordatorio } from './DbAñadirRecordatorio'


export const Dashboard = () => {
  const [activeContent, setActiveContent] = useState('inicio')

  const renderContent = () => {
    switch (activeContent) {
      case 'inicio':
        return <DbInicio />
      case 'planificador':
        return <DbPlanificador />
      case 'añadir-Metas':
        return <DbAñadirMetas />
      case 'añadir-Recordatorios':
        return <DbAñadirRecordatorio />
      default:
        return <DbInicio />
    }
  }

  return (
    <div className='content-dashboard'>
        <header>
            <div className='bg-[#011627] fixed top-0 w-full h-20 p-8 flex items-center '>   
                <div className='text-white uppercase font-bold text-2xl tracking-[4px]'>
                    <h1>JT logo</h1>
                </div>

                {/*Barra de navengación*/}
                <nav className='flex-1 flex justify-center'>
                    <ul className='flex space-x-4'>
                        <li>
                            <Link to="#" className='text-white hover:text-[#5ea3d4]' onClick={() => setActiveContent('inicio')}>Inicio</Link>
                        </li>
                        <li>
                            <Link to="#" className='text-white hover:text-[#5ea3d4]' onClick={() => setActiveContent('planificador')}>Planificador</Link>
                        </li>
                        <li>
                            <Link to="#" className='text-white hover:text-[#5ea3d4]' onClick={() => setActiveContent('añadir-Metas')}>Añadir Metas</Link>
                        </li>
                        <li>
                            <Link to="#" className='text-white hover:text-[#5ea3d4]' onClick={() => setActiveContent('añadir-Recordatorios')}>Añadir Recordatorios</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>

        {/* Contenido principal del Dashboard */}
        <main className='mt-20 p-8'>
            {renderContent()}
        </main>
    </div>
  )
}
