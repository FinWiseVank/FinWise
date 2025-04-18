import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function UserName() {
  const [nombreUsuario, setNombreUsuario] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/dashboard/data');
      
        console.log(response.data);  // Verifica la estructura completa
        // Asegúrate de que 'nombreUsuario' está presente
        const nombreUsuario = response.data.data.nombreUsuario;
        setNombreUsuario(nombreUsuario);

        console.log('Nombre de usuario:', nombreUsuario);
      } catch (error) {
        console.error('Error al obtener el nombre de usuario:', error);
      }
    };
  
    fetchData();
  }, []);
  

  if (!nombreUsuario) {
    return <div className="text-xl font-bold text-gray-800">Cargando...</div>;
  }

  return (
    <div className="text-xl font-bold text-gray-800 border border-red-500 p-2">
  {nombreUsuario}
</div>
  );
}
