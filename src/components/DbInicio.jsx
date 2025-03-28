import React, { useState } from 'react'
import { Button } from './Button'
import { GraphGeneral } from './GraphGeneral'
import clsx from 'clsx'
import { Card } from './Card'

export const DbInicio = () => {
  const [showSubmenu, setShowSubmenu] = useState(false);

  const toggleSubmenu = () => {
    setShowSubmenu(!showSubmenu);
  };

  const closeSubmenu = () => {
    setShowSubmenu(false);
  };

  return (
    <Card>
        <GraphGeneral />
      <div className='relative flex justify-center'>
        <Button onClick={toggleSubmenu} />
        {showSubmenu && (
          <div className='absolute bottom-full mb-2 flex flex-col md:flex-row bg-white bg-opacity-75 p-2 rounded shadow-lg'>
            <button className='mb-2 md:mb-0 mx-2 px-4 py-2 bg-red-500 text-white rounded transition-transform transform hover:scale-105 hover:bg-red-600 cursor-pointer'>
              Gastos
            </button>
            <button className='mx-2 px-4 py-2 bg-green-500 text-white rounded transition-transform transform hover:scale-105 hover:bg-green-600 cursor-pointer'>
              Ingresos
            </button>
          </div>
        )}
      </div>
    </Card>
  )
}
