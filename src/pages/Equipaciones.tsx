import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import CardProducto from '../components/CardProducto';
import type { Producto } from '../types/Producto';
import { API_URL } from '../utils/index';
import BarcelonaLoader from '../components/BarcelonaLoader';

const Equipaciones = () => {
    const location = useLocation();
    
    const [productos, setProductos] = useState<Producto[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        leerServicio();
    }, [location.pathname]);

    const leerServicio = async () => {
        setLoading(true);
        try {
            const pathParts = location.pathname.split('/').filter(Boolean);
            
            let ruta = `productos_categoria.php?`;

            if (pathParts.length >= 3) {
                ruta += `subsubcategoria=${pathParts[2]}`;
            } else if (pathParts.length === 2) {
                ruta += `subcategoria=${pathParts[1]}`;
            } else if (pathParts.length === 1) {
                ruta += `categoria=${pathParts[0]}`;
            }

            const response = await fetch(API_URL + ruta);
            const data = await response.json();

            const productosConvertidos = data.map((p: any) => ({
                ...p,
                precio: Number(p.precio),
                precio_oferta: p.precio_oferta ? Number(p.precio_oferta) : null,
                stock: Number(p.stock)
            }));

            setProductos(productosConvertidos);
        } catch (error) {
            console.error('Error al cargar productos:', error);
            setProductos([]);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4">
                    <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
                        Productos
                    </h1>
                    <BarcelonaLoader />
                </div>
            </section>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">
                        Equipaciones
                    </h1>
                    <p className="text-gray-600">
                        {productos.length} productos encontrados
                    </p>
                </div>

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
            </div>
        </div>
    );
};

export default Equipaciones;