import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from  "react-router-dom";
import {toast} from 'react-toastify'; 
import axios from 'axios';


const Form = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        initializeApp(); // Llama a la función al cargar el componente
    },[]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if ([email, password].includes('')) {
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

        try {
           // const response = await axios.post('https://finwise-gedvf4egduhbajbh.brazilsouth-01.azurewebsites.net/user/login', { email, contrasenia: password });
           const response = await axios.post('http://localhost:3000/user/login', { email, contrasenia: password }); 
           
           const { token } = response.data;
           //Almacena el token en el localStorage
            localStorage.setItem('token', token);
            setAuthToken(token); 

            //muestra un mensaje de éxito
           toast.success('Inicio de sesión exitoso', {
                theme: "colored",
                position: "top-center",
            });

             // Redirige a una página protegida 
             navigate("/dashboard"); 
        } catch (error) {
            toast.error(error.response?.data?.error || 'Error al iniciar sesión', {
                theme: "colored",
                position: "top-center",
            });
        }
    }

    function setAuthToken(token) {
        if(token) {
            // Aplica el token a cada solicitud si existe
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }else {
            // Elimina el token de las solicitudes
            delete axios.defaults.headers.common['Authorization'];
        }
    }

    function initializeApp(){
        // 2. Intentar recuperar el token de localStorage al cargar la app
        const token = localStorage.getItem('token');

        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
            delete axios.defaults.headers.common['Authorization']; // Eliminar el token si no existe
        }
        setAuthToken(token); // Establece el token en axios
        validarToken();

    }

    async function validarToken() {
        const token = localStorage.getItem('token');

        console.log("Token recuperado:", token);

        if(token){
            setAuthToken(token); // Establece el token en axios
            try {
                //const response = await axios.get('https://finwise-gedvf4egduhbajbh.brazilsouth-01.azurewebsites.net/user/profile', {
                   // headers: {  
                   //     Authorization: `Bearer ${token}`
                   // }
                   // });
                const response = await axios.get('http://localhost:3000/user/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log("Authorization header:", axios.defaults.headers.common['Authorization']);
                console.log("Respuesta:", response.data);       
                navigate('/dashboard');
            }catch(error){
                console.error('Error al verificar token:', error);
            }

        }else {
            console.log('No hay token almacenado.');
        }
    }
   
    return (    
        <div className='bg-[#FDFFFC] px-20 py-20 rounded-2xl border-2 border-gray-100'>
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
                    <button className='active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out py-3 rounded-xl bg-[#5EA3D4] text-white text-lg font-bold cursor-pointer'>Ingresar</button>
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