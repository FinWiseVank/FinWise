import React from 'react'
import { Link } from 'react-router-dom'

export const Dashboard = () => {
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
                            <Link to="/inicio" className='text-white hover:text-[#5ea3d4]'>Inicio</Link>
                        </li>
                        <li>
                            <Link to="/planificador" className='text-white hover:text-[#5ea3d4]'>Planificador</Link>
                        </li>
                        <li>
                            <Link to="/añadir-Metas" className='text-white hover:text-[#5ea3d4]'>Añadir Metas</Link>
                        </li>
                        <li>
                            <Link to="/añadir-Recordatorios" className='text-white hover:text-[#5ea3d4]'>Añadir Recordatorios</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    </div>
  )
}
