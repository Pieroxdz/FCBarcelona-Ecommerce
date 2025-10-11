import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CardProducto from '../components/CardProducto';
import type { Producto } from '../types/Producto';

const Equipaciones = () => {
    const { idSubcategoria, idSubsubcategoria } = useParams();

    const [productos, setProductos] = useState<Producto[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const API_BASE = 'http://pieroxdz.alwaysdata.net/WS_FCBARCELONA';
    const CATEGORIA_EQUIPACIONES = 1;

    useEffect(() => {
        leerServicio();
    }, [idSubcategoria, idSubsubcategoria]);

    const leerServicio = async () => {
        try {
            setLoading(true);
            setError(null);

            let url = `${API_BASE}/productos_categoria.php?`;

            // Prioridad: sub-subcategoría > subcategoría > categoría
            if (idSubsubcategoria) {
                url += `subsubcategoria=${idSubsubcategoria}`;
            } else if (idSubcategoria) {
                url += `subcategoria=${idSubcategoria}`;
            } else {
                url += `categoria=${CATEGORIA_EQUIPACIONES}`;
            }

            console.log('Fetching:', url);

            const response = await fetch(url);
            const data = await response.json();

            if (data.error) {
                setError(data.error);
                setProductos([]);
            } else {
                setProductos(data);
            }
        } catch (err) {
            setError('Error al cargar los productos');
            console.error(err);
            setProductos([]);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-2xl font-semibold text-gray-600">
                    Cargando productos...
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-xl text-red-600">
                    Error: {error}
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                    Equipaciones
                </h1>
                <p className="text-gray-600">
                    {productos.length} productos encontrados
                </p>
            </div>

            {/* Grid de productos */}
            {productos.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {productos.map((producto) => (
                        <CardProducto
                            key={producto.id}
                            producto={{
                                ...producto,
                                categoria: 'EQUIPACIONES'
                            }}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12">
                    <p className="text-xl text-gray-500">
                        No hay productos disponibles en esta categoría
                    </p>
                </div>
            )}
        </div>
    );
};

export default Equipaciones;