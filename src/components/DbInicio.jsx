import React, { useState } from 'react'
import { Button } from './Button'
import { GraphGeneral } from './GraphGeneral'
import clsx from 'clsx'

export const DbInicio = () => {
  const [showSubmenu, setShowSubmenu] = useState(false);

  const toggleSubmenu = () => {
    setShowSubmenu(!showSubmenu);
  };

  const closeSubmenu = () => {
    setShowSubmenu(false);
  };

  return (
    <>
      <div className='flex justify-center border-gray border-opacity-50 rounded-lg w-full h-full shadow-md'> 
        <GraphGeneral />
      </div>
      <div className='flex justify-center'>
        <Button onClick={toggleSubmenu} />
      </div>
      {showSubmenu && (
        <div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-50' onClick={closeSubmenu}>
          <div className='bg-white bg-opacity-75 p-4 rounded shadow-lg' onClick={(e) => e.stopPropagation()}>
            <div className='flex justify-center'>
              <button className='mx-2 px-4 py-2 bg-blue-500 text-white rounded'>Gastos</button>
              <button className='mx-2 px-4 py-2 bg-green-500 text-white rounded'>Ingresos</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
