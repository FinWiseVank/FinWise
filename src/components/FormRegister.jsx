import React, {useState} from 'react';
import {Link} from  "react-router-dom";
import {toast} from 'react-toastify'; 
import axios from 'axios';

const FormRegister = () => {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if ([name, lastName, email, password, confirmPassword].includes('')) {
            toast.error('Todos los campos son obligatorios', {
                theme: "colored",
                position: "top-center",
            });
            return;
        }

        if (password.length < 6) {
            toast.error('La contraseña debe tener al menos 6 caracteres', {
                theme: "colored",
                position: "top-center",
            });
            return;
        }

        if (password !== confirmPassword) {
            toast.error('Las contraseñas no coinciden', {
                theme: "colored",
                position: "top-center",
            });
            return;
        }

        try {
            //const response = await axios.post('https://finwise-gedvf4egduhbajbh.brazilsouth-01.azurewebsites.net/user/register', {
            const response = await axios.post('http://localhost:3000/user/register', {  
                nombre: name,
                apellidos: lastName,
                email,
                contrasenia: password,
            });
            toast.success('Registro exitoso', {
                theme: "colored",
                position: "top-center",
            });
            console.log(response.data);
        } catch (error) {
            toast.error(error.response?.data?.error || 'Error al registrarse', {
                theme: "colored",
                position: "top-center",
            });
        }
    };

    return (    
        <div className='bg-[#FDFFFC] px-10 py-2 rounded-2xl border-2 border-gray-100'>
            <h1 className='text-5xl mt-1 font-semibold'>FinWise</h1>
            <p className='font-medium text-lg text-[#5EA3D4] mt-2'>Crear una cuenta</p>

            <form onSubmit={handleSubmit} className='mt-6'>
                <div>
                    <label className='text-sm font-medium'>Nombre(s)</label>
                    <input 
                        type='text'
                        className='w-full border-2 border-gray-100 rounded-xl p-1.5 mt-1 bg-transparent'
                        placeholder='Ingresa tu nombre'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div>
                    <label className='text-sm font-medium'>Apellidos</label>
                    <input 
                        type='text'
                        className='w-full border-2 border-gray-100 rounded-xl p-1.5 mt-1 bg-transparent'
                        placeholder='Ingresa tu apellidos'
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>

                <div>
                    <label className='text-sm font-medium'>Email</label>
                    <input 
                        type='email'
                        className='w-full border-2 border-gray-100 rounded-xl p-1.5 mt-1 bg-transparent'
                        placeholder='Ingresa tu email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div>
                    <label className='text-sm font-medium'>Contraseña</label>
                    <input 
                        type='password'
                        className='w-full border-2 border-gray-100 rounded-xl p-1.5 mt-1 bg-transparent'
                        placeholder='Ingresa tu contraseña'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div>
                    <label className='text-sm font-medium'>Confirmar Contraseña</label>
                    <input 
                        type='password'
                        className='w-full border-2 border-gray-100 rounded-xl p-1.5 mt-1 bg-transparent'
                        placeholder='Confirmar contraseña'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>

                <div className='mt-7 flex flex-col gap-y-2'>
                    <button className='active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out py-3 rounded-xl bg-[#5EA3D4] text-white text-sm font-bold'>Crear cuenta</button>
                </div>
                <div className='mt-2 flex justify-center items-center'>
                    <p className='font-medium text-base'>¿Ya tienes cuenta?</p>
                    <Link to="/iniciar-sesion" className='text-[#5EA3D4] text-base font-medium ml-2'>Inicia sesión</Link>
                </div>
            </form>
        </div>
       
    );
}

export default FormRegister;