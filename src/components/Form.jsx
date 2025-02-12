import * as React from 'react';

export default function Form() {
    return ( 
        <div className='bg-[#FDFFFC] px-10 py-8 rounded-2xl border-2 border-gray-100'>
            <h1 className='text-5xl font-semibold'>FinWise</h1>
            <p className='font-medium text-lg text-[#5EA3D4] mt-4'>Iniciar Sesión</p>
           <div className='mt-8'>
                <div>
                    <label className='text-lg font-medium'>Email</label>
                    <input 
                        className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                        placeholder='Ingresa tu email'
                    />
                </div>

                <div>
                    <label className='text-lg font-medium'>Contraseña</label>
                    <input 
                        className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                        placeholder='Ingresa tu contraseña'
                    />
                </div>

                <div className='mt-5 flex justify-between items-center'>
                    <div>
                        <input 
                            type='checkbox'
                            id='remember'
                        />
                        <label className='ml-2 font-medium text-base' for="remember">Recordar contraseña</label>
                    </div>
                    <button className='font-medium text-base text-[#5EA3D4]'>olvide contraseña</button>
                </div>

                <div className='mt-10 flex flex-col gap-y-4'>
                    <button className='active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out py-3 rounded-xl bg-[#5EA3D4] text-white text-lg font-bold'>Ingresar</button>
                </div>
                <div className='mt-5 flex justify-center items-center'>
                    <p className='font-medium text-base'>¿No tienes cuenta?</p>
                    <button className='text-[#5EA3D4] text-base font-medium ml-2'>Registrate</button>
                </div>
           </div>
        </div>
    );
}