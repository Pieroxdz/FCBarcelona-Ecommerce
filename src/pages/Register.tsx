import React, { useState } from 'react';
import barcaLogo from './assets/barca-logo.svg';
import BarcaLogo from '../assets/BarcaLogo';
import { Link } from 'react-router-dom';

export default function Register() {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        email: '',
        password: '',
        acceptTerms: false
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = () => {
        console.log('Registro:', formData);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8">
            <div className="w-full max-w-md">
                {/* Logo y Header */}
                <div className="flex justify-center mb-8">
                    <BarcaLogo />
                </div>

                {/* Formulario */}
                <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8">
                    <h2 className="text-center text-gray-700 text-sm sm:text-base mb-6">
                        Introduce tus datos para crear una cuenta
                    </h2>

                    <div className="space-y-5">
                        {/* Campo Nombre */}
                        <div>
                            <label
                                htmlFor="nombre"
                                className="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
                            >
                                Nombre *
                            </label>
                            <input
                                id="nombre"
                                name="nombre"
                                type="text"
                                value={formData.nombre}
                                onChange={handleChange}
                                placeholder="Nombre"
                                className="w-full px-3 py-2.5 sm:py-3 border border-gray-300 rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        {/* Campo Apellido */}
                        <div>
                            <label
                                htmlFor="apellido"
                                className="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
                            >
                                Apellido *
                            </label>
                            <input
                                id="apellido"
                                name="apellido"
                                type="text"
                                value={formData.apellido}
                                onChange={handleChange}
                                placeholder="Apellido"
                                className="w-full px-3 py-2.5 sm:py-3 border border-gray-300 rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        {/* Campo Email */}
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
                            >
                                Correo electrónico *
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Correo electrónico"
                                className="w-full px-3 py-2.5 sm:py-3 border border-gray-300 rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        {/* Campo Contraseña */}
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
                            >
                                Contraseña *
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Contraseña"
                                className="w-full px-3 py-2.5 sm:py-3 border border-gray-300 rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />

                        </div>

                        {/* Botón Crear */}
                        <button
                            onClick={handleSubmit}
                            className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-3 sm:py-3.5 rounded-md text-sm sm:text-base transition-colors duration-200 uppercase cursor-pointer"
                        >
                            Crear
                        </button>
                    </div>

                    {/* Texto política de privacidad */}
                    <p className="mt-4 text-xs text-gray-600 text-center">
                        Al crear una cuenta y registrarse, confirmas que has leído y aceptas la política de privacidad
                    </p>

                    {/* Enlace Iniciar Sesión */}
                    <div className="mt-6 text-center">
                        <Link
                            to="/login"
                            className="text-sm sm:text-base text-gray-900 font-semibold underline hover:text-gray-700 cursor-pointer"
                        >
                            INICIAR SESIÓN
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}