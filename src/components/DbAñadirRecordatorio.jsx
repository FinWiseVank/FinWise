import React from 'react';
import { Calendar } from './Calendar';


export const DbAñadirRecordatorio = () => {
  return (
    <div>
      <h1 className='text-center text-2xl font-bold my-4 text-blue-500'>Añadir Recordatorios</h1>
      <div>
          <Calendar />
      </div>
    </div>
  );
};
