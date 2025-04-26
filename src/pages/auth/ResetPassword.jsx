import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSearchParams } from "react-router-dom";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
        toast.error('Token no válido o expirado');
        return;
    }

    if (!newPassword || newPassword.length < 6) {
        toast.error('La contraseña debe tener al menos 6 caracteres');
        return;
    }

    try {
      await axios.post('http://localhost:3000/user/reset-password', {
        token: token,
        contrasenia: newPassword
      },{
        headers: {
            'Content-Type': 'application/json'
        }
      });

      toast.success('Contraseña restablecida con éxito');
      navigate('/iniciar-sesion');
      
    } catch (error) {
        console.log(error.response);
      toast.error(error.response?.data?.error || 'Error al restablecer la contraseña');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <button
          onClick={() => navigate('/restaurar-contraseña')}
          className="absolute top-4 left-4 py-2 px-6 border-2 border-gray-400 text-gray-600 font-semibold rounded-3xl hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-600"
          > &lt; Atrás
      </button>
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Restablecer Contraseña</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="password"
              placeholder="Nueva contraseña"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              minLength="6"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Guardar nueva contraseña
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
