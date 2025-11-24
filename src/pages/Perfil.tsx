import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

const Perfil = () => {
    // Datos temporales (hardcodeados)
    const usuario = {
        nombres: "Markin Piero",
        apellidos: "Pulache Guarniz",
        email: "markinpieroprueba@gmail.com",
    };

    const navigate = useNavigate()
    const { logout } = useAuth()

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800">
            {/* Encabezado */}
            <div className="bg-blue-700 text-white py-14 px-6">
                <h1 className="text-4xl font-bold">Mi Cuenta</h1>
                <p className="mt-2 text-lg">
                    Bienvenido, {usuario.nombres}
                </p>
            </div>

            <div className="max-w-3xl mx-auto py-12 px-6 space-y-10">

                {/* Datos personales */}
                <section className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-bold mb-3">Información del Usuario</h2>
                    <p><strong>Nombres:</strong> {usuario.nombres}</p>
                    <p><strong>Apellidos:</strong> {usuario.apellidos}</p>
                    <p><strong>Email:</strong> {usuario.email}</p>
                </section>

                {/* Botón de cerrar sesión */}
                <div>
                    <button
                        className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
                        type="submit"
                        onClick={() => {
                            logout()
                            navigate("/login")
                        }}
                    >Cerrar sesion</button>
                </div>
            </div>
        </div>
    );
};

export default Perfil;
