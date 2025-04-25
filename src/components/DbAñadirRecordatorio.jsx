import React from 'react';
import { Calendar } from './Calendar';
import { Card } from './Card';


export const DbAñadirRecordatorio = (
  { recordatorios, onRecordatorioAdded } // Asegúrate de pasar la función onRecordatorioAdded desde el componente padre
) => {
  return (
    <Card>
    <div>
      <h1 className='text-center text-2xl font-bold my-4 text-blue-500'>Añadir Recordatorios</h1>
      <div>
          <Calendar recordatorios={recordatorios}onRecordatorioAdded={onRecordatorioAdded}/>
      </div>
    </div>
    </Card>
  );
};
