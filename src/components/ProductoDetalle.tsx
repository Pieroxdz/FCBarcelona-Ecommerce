import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { ProductoDetalle as ProductoDetalleType } from '../types/ProductoDetalle';

export default function ProductoDetalle() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [producto, setProducto] = useState<ProductoDetalleType | null>(null);
    const [cantidad, setCantidad] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            obtenerProducto(id);
        }
    }, [id]);

    const obtenerProducto = async (idProducto: string): Promise<void> => {
        try {
            setLoading(true);

            const response = await fetch(
                `https://pieroxdz.alwaysdata.net/WS_FCBARCELONA/producto_detalle.php?id=${idProducto}`
            );
            const data = await response.json();

            if (data.error) {
                setError(data.error);
            } else {
                setProducto(data);
            }
            setLoading(false);
        } catch (error) {
            console.error('Error al obtener producto:', error);
            setError('Error al cargar el producto');
            setLoading(false);
        }
    };

    const handleAddToCart = (): void => {
        if (!producto) return;

        console.log('Añadir al carrito:', {
            producto_id: producto.id,
            nombre: producto.nombre,
            cantidad: cantidad,
            precio: producto.precio
        });

        const carritoStr = localStorage.getItem('carrito');
        const carrito = carritoStr ? JSON.parse(carritoStr) : [];
        const itemExistente = carrito.find((item: any) => item.id === producto.id);

        if (itemExistente) {
            itemExistente.cantidad += cantidad;
        } else {
            carrito.push({
                id: producto.id,
                nombre: producto.nombre,
                precio: producto.precio,
                imagen: producto.imagen,
                cantidad: cantidad
            });
        }

        localStorage.setItem('carrito', JSON.stringify(carrito));
        alert('Producto añadido al carrito');
    };

    const handleCantidadChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const valor = parseInt(e.target.value);
        if (valor > 0) {
            setCantidad(valor);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-xl text-gray-600">
                    <i className="fas fa-spinner fa-spin mr-2"></i>
                    Cargando producto...
                </div>
            </div>
        );
    }

    if (error || !producto) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <div className="text-xl text-red-600 mb-4">
                    <i className="fas fa-exclamation-circle mr-2"></i>
                    {error || 'Producto no encontrado'}
                </div>
                <button
                    onClick={() => navigate('/productos')}
                    className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                    <i className="fas fa-arrow-left mr-2"></i>
                    Volver a productos
                </button>
            </div>
        );
    }

    // Calcular precio final con conversión segura
    const precioFinal = Number(producto.precio_oferta || producto.precio || 0);
    const tieneDescuento = !!producto.precio_oferta && producto.precio_oferta !== 0;
    const porcentajeDescuento = tieneDescuento
        ? Math.round(((Number(producto.precio) - Number(producto.precio_oferta)) / Number(producto.precio)) * 100)
        : 0;


    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Botón volver */}
                <button
                    onClick={() => navigate(-1)}
                    className="mb-6 text-gray-600 hover:text-gray-900 flex items-center gap-2 transition-colors"
                >
                    <i className="fas fa-arrow-left"></i>
                    <span>Volver</span>
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                    {/* Columna izquierda - Imagen */}
                    <div className="space-y-4">
                        <div className="relative bg-gray-50 rounded-lg overflow-hidden aspect-square flex items-center justify-center">
                            {/* Badge de descuento */}
                            {tieneDescuento && (
                                <div className="absolute top-4 left-4 bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold z-10">
                                    <i className="fas fa-tag mr-1"></i>
                                    -{porcentajeDescuento}%
                                </div>
                            )}

                            {/* Badge sin stock */}
                            {producto.stock === 0 && (
                                <div className="absolute top-4 left-4 bg-gray-800 text-white px-4 py-2 rounded text-sm font-semibold z-10">
                                    <i className="fas fa-times-circle mr-1"></i>
                                    Agotado
                                </div>
                            )}

                            {/* Botón zoom */}
                            <button className="absolute top-4 right-4 bg-white p-3 rounded-full shadow-lg hover:bg-gray-50 z-10 transition-colors">
                                <i className="fas fa-search-plus text-gray-600"></i>
                            </button>

                            {producto.imagen ? (
                                <img
                                    src={producto.imagen}
                                    alt={producto.nombre}
                                    className="w-full h-full object-contain p-8"
                                />
                            ) : (
                                <div className="text-gray-400 text-center">
                                    <i className="fas fa-image text-6xl mb-2"></i>
                                    <div>Sin imagen disponible</div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Columna derecha - Información */}
                    <div className="space-y-6">
                        <div>
                            {/* Título */}
                            <h1 className="text-4xl font-bold text-gray-900 mb-4 uppercase tracking-wide">
                                {producto.nombre}
                            </h1>

                            {/* Valoración */}
                            <div className="flex items-center gap-2 mb-6">
                                <div className="flex gap-1">
                                    <i className="fas fa-star text-yellow-400"></i>
                                    <i className="fas fa-star text-yellow-400"></i>
                                    <i className="fas fa-star text-yellow-400"></i>
                                    <i className="fas fa-star text-yellow-400"></i>
                                    <i className="far fa-star text-yellow-400"></i>
                                </div>
                                <span className="text-gray-500 text-sm">
                                    (1 customer review)
                                </span>
                            </div>

                            {/* Precios */}
                            <div className="flex items-baseline gap-3 mb-6">
                                {tieneDescuento ? (
                                    <>
                                        <span className="text-4xl font-bold text-red-600">
                                            ${precioFinal.toFixed(2)}
                                        </span>
                                        <span className="text-2xl text-gray-400 line-through">
                                            ${Number(producto.precio).toFixed(2)}
                                        </span>
                                    </>
                                ) : (
                                    <span className="text-4xl font-bold text-gray-900">
                                        ${Number(producto.precio).toFixed(2)}
                                    </span>
                                )}
                            </div>

                            {/* Descripción */}
                            {producto.descripcion && (
                                <p className="text-gray-600 leading-relaxed mb-8">
                                    {producto.descripcion}
                                </p>
                            )}

                            {/* Stock disponible */}
                            <div className="flex items-center gap-2 text-sm mb-4">
                                {producto.stock > 0 ? (
                                    <>
                                        <i className="fas fa-check-circle text-green-600"></i>
                                        <span className="text-gray-600">
                                            Stock disponible: <span className="font-semibold text-green-600">{producto.stock} unidades</span>
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        <i className="fas fa-times-circle text-red-600"></i>
                                        <span className="text-red-600 font-semibold">Sin stock</span>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Controles de cantidad y botones */}
                        <div className="flex gap-3">
                            {/* Selector de cantidad */}
                            <div className="flex items-center border-2 border-gray-300 rounded-lg">
                                <button
                                    onClick={() => setCantidad(Math.max(1, cantidad - 1))}
                                    className="px-4 py-3 hover:bg-gray-50 transition-colors text-gray-700 font-bold"
                                    disabled={producto.stock === 0}
                                >
                                    <i className="fas fa-minus"></i>
                                </button>
                                <input
                                    type="number"
                                    value={cantidad}
                                    onChange={handleCantidadChange}
                                    className="w-16 text-center border-x-2 border-gray-300 py-3 focus:outline-none font-semibold"
                                    min="1"
                                    max={producto.stock}
                                    disabled={producto.stock === 0}
                                />
                                <button
                                    onClick={() => setCantidad(Math.min(producto.stock, cantidad + 1))}
                                    className="px-4 py-3 hover:bg-gray-50 transition-colors text-gray-700 font-bold"
                                    disabled={producto.stock === 0}
                                >
                                    <i className="fas fa-plus"></i>
                                </button>
                            </div>

                            {/* Botón Add to Cart */}
                            <button
                                onClick={handleAddToCart}
                                disabled={producto.stock === 0}
                                className={`flex-1 py-3 px-6 rounded-lg transition-colors font-semibold uppercase tracking-wide ${producto.stock === 0
                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    : 'bg-gray-900 text-white hover:bg-gray-800'
                                    }`}
                            >
                                <i className="fas fa-shopping-cart mr-2"></i>
                                {producto.stock === 0 ? 'Sin stock' : 'Add to Cart'}
                            </button>

                            {/* Botón Favoritos */}
                            <button
                                className="border-2 border-gray-300 p-3 rounded-lg hover:bg-gray-50 hover:border-red-500 hover:text-red-500 transition-colors"
                                title="Agregar a favoritos"
                            >
                                <i className="far fa-heart text-xl"></i>
                            </button>

                            {/* Botón Comparar */}
                            <button
                                className="border-2 border-gray-300 p-3 rounded-lg hover:bg-gray-50 hover:border-blue-500 hover:text-blue-500 transition-colors"
                                title="Comparar producto"
                            >
                                <i className="fas fa-exchange-alt text-xl"></i>
                            </button>
                        </div>

                        {/* Información adicional */}
                        <div className="pt-6 border-t border-gray-200 space-y-3">
                            {/* SKU */}
                            <div className="flex items-center gap-2 text-gray-600">
                                <i className="fas fa-barcode text-gray-400"></i>
                                <span className="font-medium">SKU:</span>
                                <span className="text-gray-800">{producto.slug}</span>
                            </div>

                            {/* Categorías */}
                            <div className="flex items-start gap-2 text-gray-600">
                                <i className="fas fa-tags text-gray-400 mt-1"></i>
                                <div>
                                    <span className="font-medium">Category: </span>
                                    <span className="text-gray-800">
                                        {[
                                            producto.categoria_nombre,
                                            producto.subcategoria_nombre,
                                            producto.sub_subcategoria_nombre
                                        ]
                                            .filter(Boolean)
                                            .join(', ') || 'Sin categoría'}
                                    </span>
                                </div>
                            </div>

                            {/* Estado */}
                            <div className="flex items-center gap-2 text-gray-600">
                                <i className={`fas fa-circle text-xs ${producto.activo ? 'text-green-500' : 'text-gray-400'}`}></i>
                                <span className="font-medium">Estado:</span>
                                <span className="text-gray-800">{producto.activo ? 'Activo' : 'Inactivo'}</span>
                            </div>
                        </div>

                        {/* Compartir en redes sociales */}
                        <div className="pt-4 border-t border-gray-200">
                            <div className="flex items-center gap-3">
                                <span className="text-gray-600 font-medium">Compartir:</span>
                                <button className="text-gray-600 hover:text-blue-600 transition-colors">
                                    <i className="fab fa-facebook text-xl"></i>
                                </button>
                                <button className="text-gray-600 hover:text-blue-400 transition-colors">
                                    <i className="fab fa-twitter text-xl"></i>
                                </button>
                                <button className="text-gray-600 hover:text-pink-600 transition-colors">
                                    <i className="fab fa-instagram text-xl"></i>
                                </button>
                                <button className="text-gray-600 hover:text-green-600 transition-colors">
                                    <i className="fab fa-whatsapp text-xl"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}