import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";


const RestaurarContraseña = () => {

    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [setLoading] = useState(false);

    useEffect(() => {
        if (!token) {
            setError("Token no válido o expirado.");
        }
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
        setError("Las contraseñas no coinciden");
        return;
        }

        try {
        setLoading(true);
        const response = await fetch("http://localhost:3000/user/reset-password", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({ token, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Ocurrió un error");
        }

        setSuccess(true);
        setError("");
        } catch (err) {
        setError(err.message);
        setSuccess(false);
        } finally {
        setLoading(false);
        }
  };
    
    return(
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Restablecer Contraseña</h1>
                {!token ? (
                <p className="text-red-500">Token no válido</p>
                ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nueva Contraseña</label>
                <input
                    type="password"
                    className="w-full px-3 py-2 border rounded-lg"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Confirmar Contraseña</label>
              <input
                type="password"
                className="w-full px-3 py-2 border rounded-lg"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                />
              
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && <p className="text-green-500 text-sm">¡Contraseña actualizada con éxito!</p>}
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"> Restablecer </button>
          </form>
        )}
             </div>
        </div>
    )
}

export default RestaurarContraseña;