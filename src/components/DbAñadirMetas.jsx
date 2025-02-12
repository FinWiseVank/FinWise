import React from 'react';
import { Box } from './Box';
import { Button } from './Button';

export const DbAñadirMetas = () => {
  return (
    <div>
      <h1 className='text-center text-2xl font-bold my-4 text-blue-500'>Añadir Metas</h1>
      <div className="flex flex-col items-center">
        <Box />
        <Button />
      </div>
    </div>
  );
};
