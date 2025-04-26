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
    <div>
      <h2>Restablecer Contraseña</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Nueva contraseña"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button type="submit">Guardar nueva contraseña</button>
      </form>
    </div>
  );
};

export default ResetPassword;
