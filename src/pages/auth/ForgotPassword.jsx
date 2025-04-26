import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('https://finwise-gedvf4egduhbajbh.brazilsouth-01.azurewebsites.net/user/forgot-password', { email });
      //await axios.post('http://localhost:3000/user/forgot-password', { email });
      toast.success('Correo enviado con instrucciones para restablecer la contraseña');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Error al enviar el correo');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <button
          onClick={() => navigate('/iniciar-sesion')}
          className="absolute top-4 left-4 py-2 px-6 border-2 border-gray-400 text-gray-600 font-semibold rounded-3xl hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-600"
          > &lt; Atrás
      </button>
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Recuperar contraseña</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Tu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Enviar instrucciones
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
