import HomePage from "./pages/auth/HomePage"
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import Dashboard from "./pages/Dashboard"
import NotFound from "./pages/NotFound"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  return (
    <AuthProvider>

      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} /> 
          <Route path="/iniciar-sesion" element={<Login />} />
          <Route path="/registro" element={<Register />} />
          <Route path="/restaurar-contraseña" element={<ForgotPassword />} />
          <Route path="/restablecer-contraseña" element={<ResetPassword />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="/dashboard" element={ <PrivateRoute> <Dashboard/> </PrivateRoute>} />

        </Routes>

      </BrowserRouter> 
    </AuthProvider>

    
  )
}

export default App
