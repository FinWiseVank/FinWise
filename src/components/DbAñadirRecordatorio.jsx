import React, { useEffect, useState } from 'react';
import { Calendar } from './Calendar';
import { Card } from './Card';

export const DbAñadirRecordatorio = ({ recordatorios, onRecordatorioAdded }) => {
  const [localRecordatorios, setLocalRecordatorios] = useState([]);

  useEffect(() => {
    setLocalRecordatorios(recordatorios); // Actualizar datos locales cuando cambien los recordatorios
  }, [recordatorios]);

  return (
    <Card>
      <div>
        <h1 className='text-center text-2xl font-bold my-4 text-blue-500'>Añadir Recordatorios</h1>
        <div>
          <Calendar recordatorios={localRecordatorios} onRecordatorioAdded={onRecordatorioAdded} />
        </div>
      </div>
    </Card>
  );
};
