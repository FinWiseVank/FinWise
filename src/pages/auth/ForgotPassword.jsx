import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:3000/user/forgot-password', { email });
      toast.success('Correo enviado con instrucciones para restablecer la contraseña');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Error al enviar el correo');
    }
  };

  return (
    <div>
      <h2>Recuperar contraseña</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Tu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Enviar instrucciones</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
