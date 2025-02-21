import React, {useState} from 'react';
import {Link} from  "react-router-dom";
import {toast} from 'react-toastify'; 

const Form = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if([email, password].includes('')){
            toast.error('Todos los campos son obligatorios', {
                theme: "colored",
                position: "top-center",
            }); 
            return;
        }

        if(password.length < 6){
            toast.error('La contraseña debe tener al menos 6 caracteres', {
                theme: "colored",
                position: "top-center",
            }); 
            return;
        }
    }

    return (    
        <div className='bg-[#FDFFFC] px-10 py-8 rounded-2xl border-2 border-gray-100'>
            <h1 className='text-5xl font-semibold'>FinWise</h1>
            <p className='font-medium text-lg text-[#5EA3D4] mt-4'>Iniciar Sesión</p>

            <form onSubmit={handleSubmit} className='mt-8'>
                <div>
                    <label className='text-lg font-medium'>Email</label>
                    <input 
                        type='email'
                        className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                        placeholder='Ingresa tu email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div>
                    <label className='text-lg font-medium'>Contraseña</label>
                    <input 
                        type='password'
                        className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                        placeholder='Ingresa tu contraseña'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className='mt-5 flex justify-between items-center'>
                    <div>
                        <input 
                            type='checkbox'
                            id='remember'
                        />
                        <label className='ml-2 font-medium text-base'>Recordar contraseña</label>
                    </div>
                    <Link to="/restaurar-contraseña" className='font-medium text-base ml-3 text-[#5EA3D4]'>¿Olvidaste tu contraseña?</Link>
                </div>

                <div className='mt-10 flex flex-col gap-y-4'>
                    <button className='active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out py-3 rounded-xl bg-[#5EA3D4] text-white text-lg font-bold'>Ingresar</button>
                </div>
           </form>

            <div className='mt-5 flex justify-center items-center'>
                <p className='font-medium text-base'>¿No tienes cuenta?</p>
                <Link to="/registro" className='text-[#5EA3D4] text-base font-medium ml-2'> Registrate</Link>
            </div>

        </div>
       
    );
}

export default Form;