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
      <div className='flex justify-center border-gray border-opacity-50 rounded-lg w-full h-full shadow-md'> 
        <GraphGeneral />
      </div>
      <div className='relative flex justify-center'>
        <Button onClick={toggleSubmenu} />
        {showSubmenu && (
          <div className='absolute bottom-full mb-2 flex bg-white bg-opacity-75 p-2 rounded shadow-lg'>
            <button className='mx-2 px-4 py-2 bg-red-300 text-white rounded'>Gastos</button>
            <button className='mx-2 px-4 py-2 bg-green-500 text-white rounded'>Ingresos</button>
          </div>
        )}
      </div>
    </Card>
  )
}
