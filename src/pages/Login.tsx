import { useEffect, useState } from 'react';
import BarcaLogo from '../assets/BarcaLogo';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { API_URL } from '../utils';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const { isAunthenticated, login } = useAuth();

    useEffect(() => {
        if (isAunthenticated) {
            navigate("/");
        }
    }, [isAunthenticated, navigate]);

    const iniciarSesion = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        console.log("🚀 Iniciando sesión...");
        console.log("Email:", email);
        console.log("API_URL:", API_URL);

        setIsLoading(true);
        setErrorMessage("");

        try {
            const formData = new FormData();
            formData.append("email", email);
            formData.append("password", password);

            const response = await fetch(API_URL + "login.php", {
                body: formData,
                method: "POST"
            });

            console.log("📡 Response status:", response.status);
            console.log("📡 Response ok:", response.ok);

            const data: string = await response.text();
            console.log("Datos recibidos del servidor:", data);


            switch (data) {
                case "-1":
                    setErrorMessage("El correo electrónico no está registrado");
                    break;
                case "-2":
                    setErrorMessage("La contraseña es incorrecta");
                    break;
                default:
                    const datosUsuario = JSON.parse(data);
                    login(datosUsuario[0].nombres);
                    navigate("/Equipaciones");
                    setErrorMessage("Error al procesar la respuesta del servidor");
                    break;
            }
        } catch (error) {
            setErrorMessage("Ha ocurrido un error: " + error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md">
                {/* Logo y Header */}
                <div className="flex justify-center mb-8">
                    <BarcaLogo />
                </div>

                {/* Formulario */}
                <form onSubmit={iniciarSesion} className="bg-white rounded-lg shadow-sm p-6 sm:p-8">
                    <h1 className="text-center text-gray-700 text-sm sm:text-base mb-2">
                        Introduce tus datos para iniciar sesión
                    </h1>

                    {/* Mensaje de Error */}
                    {errorMessage && (
                        <p className="text-center text-red-600 text-xs sm:text-sm mb-4 font-medium">
                            {errorMessage}
                        </p>
                    )}

                    <div className="space-y-5">
                        {/* Campo Email */}
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
                            >
                                Correo electrónico
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                disabled={isLoading}
                                placeholder="Correo electrónico"
                                className="w-full px-3 py-2.5 sm:py-3 border border-gray-300 rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                            />
                        </div>

                        {/* Campo Contraseña */}
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
                            >
                                Contraseña
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                disabled={isLoading}
                                placeholder="Contraseña"
                                className="w-full px-3 py-2.5 sm:py-3 border border-gray-300 rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                            />
                        </div>

                        {/* Enlace Olvidaste contraseña */}
                        <div className="text-left">
                            <button
                                type="button"
                                onClick={() => console.log('Recuperar contraseña')}
                                className="text-xs sm:text-sm text-gray-700 underline hover:text-gray-900"
                            >
                                ¿Has olvidado tu contraseña?
                            </button>
                        </div>

                        {/* Botón Iniciar Sesión */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-3 sm:py-3.5 rounded-md text-sm sm:text-base transition-colors duration-200 uppercase disabled:bg-gray-300 disabled:cursor-not-allowed"
                        >
                            {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                        </button>
                    </div>

                    {/* Enlace Crear Cuenta */}
                    <div className="mt-6 text-center">
                        <Link
                            to="/register"
                            className="text-sm sm:text-base text-gray-900 font-semibold underline hover:text-gray-700 cursor-pointer"
                        >
                            CREAR CUENTA
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}