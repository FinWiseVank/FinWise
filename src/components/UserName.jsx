// UserName.jsx
import React from 'react';

const UserName = ({ nombreUsuario }) => {
  if (!nombreUsuario) {
    return <div className="text-xl font-bold text-gray-800">Cargando...</div>;
  }

  return (
    <div className="text-xl font-bold text-gray-800 border border-red-500 p-2">
      {nombreUsuario}
    </div>
  );
};

export default UserName;