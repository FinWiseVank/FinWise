import axios from 'axios';
import Form from "../../components/FormLogin";
import fondoLogin from '../../assets/Login.png';

const Login = () =>{
  return (
    <div className="flex w-full h-screen bg-[#EAEDED]">
        <div className="hidden lg:flex w-1/2 h-full bg-cover bg-center overflow-hidden shadow-lg" style={{ backgroundImage: `url(${fondoLogin})` }}/>

        <div className="w-full flex items-center justify-center lg:w-1/2 bg-[#EAEDED]">
            <Form />
        </div>  
    </div>
  );
}

export default Login;