import FormRegister from '../../components/FormRegister';
import fondoRegistro from '../../assets/Registro.png';

const Register = () => {
  return (
    <div className="flex w-full h-screen bg-[#EAEDED]">
        <div className="hidden lg:flex w-1/2 h-full  bg-cover bg-center overflow-hidden shadow-lg" style={{ backgroundImage: `url(${fondoRegistro})` }}/>

        <div className="ww-full flex items-center justify-center lg:w-1/2 bg-[#EAEDED]">
           <FormRegister />
        </div>  
    </div>
  );
}

export default Register;