import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
import RestaurarContraseña from "./pages/auth/RestaurarContraseña"
import NotFound from "./pages/NotFound"
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} /> 
        <Route path="/iniciar-sesion" element={<Login />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/restaurar-contraseña" element={<RestaurarContraseña />} />
        <Route path="*" element={<NotFound />} />

      </Routes>

    </BrowserRouter> 
    
  )
}

export default App
