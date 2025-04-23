import React from "react";
import fondoHome from "../../assets/fondoHome.png";
import { Link } from "react-router-dom";

 const HomePage = () => {
    return(
    <div>
        <div className="relative w-full h-screen bg-cover bg-center"
         style={{ backgroundImage: `url(${fondoHome})` }}>

            <div className="absolute inset-0 bg-black opacity-65"></div>

            <nav className="relative z-10 flex items-center px-6">
                <h1 className="text-white px-10 text-4xl font-bold">FinWise</h1>
                <div className="ml-auto flex gap-4 py-8 px-10">
                    <Link to="/iniciar-sesion">
                        <button className="px-8 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xl rounded-3xl transition duration-300">Iniciar Sesión</button>
                    </Link>
                    <Link to="/registro">
                        <button className="px-8 py-2 bg-green-600 hover:bg-green-700 text-white text-xl rounded-3xl transition duration-300 ml-4">Registrarse</button>
                    </Link>
                </div>
            </nav>
            <div className="relative z-10 px-10 flex items-start justify-start h-[calc(100vh-80px)]">
                <div className="text-white max-w-xl mt-24 text-left">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Domina tus finanzas con inteligencia artificial</h1>
                    <p className="text-lg md:text-xl leading-relaxed">Gestioná tus ingresos, controlá tus gastos, y alcanzá tus metas 
                        con el poder de una IA que te guía con consejos personalizados. FinWise es tu asistente
                         financiero inteligente, diseñado para ayudarte a ahorrar, planificar y tomar mejores decisiones económicas cada día.</p>
                    <Link to="/iniciar-sesion">
                        <button className=" px-8 py-2 mt-10 bg-blue-600 hover:bg-blue-700 text-white text-xl rounded-3xl transition duration-300">Comenzar</button>
                    </Link>
                </div>
            </div>
        </div>

        <footer className="bg-gray-800 text-white py-8 ">
            <div className="max-w-screen-lg mx-auto text-center">
                <p className="text-sm">© 2025 FinWise. Todos los derechos reservados.</p>
                <div className="mt-4 flex justify-center gap-6">
                    <Link to="/terminos" className="text-sm hover:underline">Términos de servicio</Link>
                    <Link to="/privacidad" className="text-sm hover:underline">Política de privacidad</Link>
                    <Link to="/contacto" className="text-sm hover:underline">Contacto</Link>
                </div>
            </div>
        </footer>

    </div>
        
    )
}

export default HomePage;