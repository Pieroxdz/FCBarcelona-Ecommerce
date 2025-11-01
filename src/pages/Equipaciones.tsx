import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CardProducto from '../components/CardProducto';
import type { Producto } from '../types/Producto';
import { API_URL } from '../utils/index';

const Equipaciones = () => {
    const { idSubcategoria, idSubsubcategoria } = useParams();

    const [productos, setProductos] = useState<Producto[]>([]);
    const [filasPagina] = useState(12);
    const [numeroPagina, setNumeroPagina] = useState(1);
    const [totalFilas, setTotalFilas] = useState(0);
    const [totalPaginas, setTotalPaginas] = useState(0);

    const CATEGORIA_EQUIPACIONES = 1;

    // Resetear a página 1 cuando cambien las categorías
    useEffect(() => {
        setNumeroPagina(1);
    }, [idSubcategoria, idSubsubcategoria]);

    useEffect(() => {
        leerServicio();
    }, [numeroPagina, filasPagina, idSubcategoria, idSubsubcategoria]);

    const leerServicio = async () => {
        try {
            let ruta = `productos_paginacion.php?filas_pagina=${filasPagina}&numero_pagina=${numeroPagina}`;

            // Prioridad: sub-subcategoría > subcategoría > categoría
            if (idSubsubcategoria) {
                ruta += `&subsubcategoria=${idSubsubcategoria}`;
            } else if (idSubcategoria) {
                ruta += `&subcategoria=${idSubcategoria}`;
            } else {
                ruta += `&categoria=${CATEGORIA_EQUIPACIONES}`;
            }

            console.log('📡 Fetching:', API_URL + ruta);

            const response = await fetch(API_URL + ruta);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('📦 Datos recibidos:', data);

            // Convertir precios a número
            const productosConvertidos = data.productos.map((p: any) => ({
                ...p,
                precio: Number(p.precio),
                precio_oferta: p.precio_oferta ? Number(p.precio_oferta) : null,
                stock: Number(p.stock)
            }));

            setProductos(productosConvertidos);
            setTotalFilas(data.total);
            const tPaginas = Math.ceil(data.total / filasPagina);
            setTotalPaginas(tPaginas);
        } catch (error) {
            console.error('❌ Error en leerServicio:', error);
            setProductos([]);
            setTotalFilas(0);
            setTotalPaginas(0);
        }
    };

    const retroceder = () => {
        if (numeroPagina > 1) {
            setNumeroPagina(numeroPagina - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const avanzar = () => {
        if (numeroPagina < totalPaginas) {
            setNumeroPagina(numeroPagina + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const dibujarNavegacion = () => {
        if (totalPaginas === 0) return null;

        return (
            <nav className="flex items-center justify-center gap-2 mb-8 flex-wrap">
                <button
                    onClick={retroceder}
                    disabled={numeroPagina === 1}
                    className={`px-4 py-2 border rounded-lg font-medium transition-colors ${numeroPagina === 1
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-white border-gray-300 hover:bg-gray-900 hover:text-white'
                        }`}
                >
                    Retroceder
                </button>
                {Array.from({ length: totalPaginas }, (_, index) => {
                    const paginaNum = index + 1;
                    const isActive = paginaNum === numeroPagina;
                    return (
                        <button
                            key={paginaNum}
                            className={`w-10 h-10 rounded-lg font-semibold transition-colors ${isActive
                                ? 'bg-amber-300 text-gray-900'
                                : 'bg-white border border-gray-300 hover:bg-gray-100'
                                }`}
                            onClick={() => {
                                setNumeroPagina(paginaNum);
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                        >
                            {paginaNum}
                        </button>
                    );
                })}
                <button
                    onClick={avanzar}
                    disabled={numeroPagina === totalPaginas}
                    className={`px-4 py-2 border rounded-lg font-medium transition-colors ${numeroPagina === totalPaginas
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-white border-gray-300 hover:bg-gray-900 hover:text-white'
                        }`}
                >
                    Avanzar
                </button>
            </nav>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">
                        Equipaciones
                    </h1>
                    <p className="text-gray-600">
                        {totalFilas} productos encontrados
                    </p>
                </div>

                {/* Navegación superior */}
                {dibujarNavegacion()}

                {/* Grid de productos */}
                {productos.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {productos.map((producto) => (
                            <CardProducto key={producto.id} producto={producto} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-xl text-gray-500">
                            No hay productos disponibles en esta categoría
                        </p>
                    </div>
                )}

                {/* Navegación inferior */}
                <div className="mt-8">
                    {dibujarNavegacion()}
                </div>
            </div>
        </div>
    );
};

export default Equipaciones;