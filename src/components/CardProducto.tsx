import type { Producto } from "../types/Producto";

interface CardProductoProps {
    producto: Producto;
}

const CardProducto = ({ producto }: CardProductoProps) => {
    // Calcular precio final (con oferta si existe)
    const precioFinal = producto.precio_oferta || producto.precio;
    const tieneDescuento = producto.precio_oferta !== null;

    // Calcular porcentaje de descuento
    const porcentajeDescuento = tieneDescuento
        ? Math.round(((producto.precio - producto.precio_oferta) / producto.precio) * 100)
        : 0;

    return (
        <div className={`bg-white rounded-lg overflow-hidden ${producto.stock > 0 ? 'group cursor-pointer' : 'cursor-not-allowed opacity-75'}`}>
            {/* Imagen del producto */}
            <div className="relative bg-gray-100 aspect-square overflow-hidden">
                <img
                    src={producto.imagen || '/placeholder-product.jpg'}
                    alt={producto.nombre}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* Badge de descuento */}
                {tieneDescuento && (
                    <div className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                        -{porcentajeDescuento}%
                    </div>
                )}

                {/* Badge sin stock */}
                {producto.stock === 0 && (
                    <div className="absolute top-3 left-3 bg-gray-800 text-white px-3 py-1 rounded text-xs font-semibold">
                        Agotado
                    </div>
                )}

                {/* Iconos de acción en hover */}
                {producto.stock > 0 && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 z-10 opacity-0 group-hover:opacity-100 group-hover:top-1/2 transition-all duration-500 flex gap-2 transform -translate-y-1/2">
                        {/* Icono Favoritos */}
                        <button className="bg-black text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors duration-200 shadow-md">
                            <i className="far fa-heart"></i>
                        </button>

                        {/* Icono Vista Rápida */}
                        <button className="bg-black text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors duration-200 shadow-md">
                            <i className="far fa-eye"></i>
                        </button>

                        {/* Icono Comparar */}
                        <button className="bg-black text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors duration-200 shadow-md">
                            <i className="fas fa-exchange-alt"></i>
                        </button>
                    </div>
                )}
            </div>

            {/* Información del producto */}
            <div className="p-4">
                {/* Categoría */}
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">
                    {producto.categoria}
                </p>

                {/* Estrellas de valoración */}
                <div className="flex items-center gap-1 mb-2">
                    <i className="fas fa-star text-yellow-400 text-sm"></i>
                    <i className="fas fa-star text-yellow-400 text-sm"></i>
                    <i className="fas fa-star text-yellow-400 text-sm"></i>
                    <i className="far fa-star text-yellow-400 text-sm"></i>
                    <i className="far fa-star text-yellow-400 text-sm"></i>
                </div>

                {/* Nombre del producto */}
                <h3 className="text-base font-semibold text-gray-800 mb-3 line-clamp-2 min-h-[3rem]">
                    {producto.nombre}
                </h3>

                {/* Precios / Add to Cart - Contenedor fijo para evitar shifts */}
                <div className="relative mb-3 h-6">
                    {/* Precio */}
                    <div className={`transition-opacity duration-500 ${producto.stock > 0 ? 'group-hover:opacity-0' : ''}`}>
                        <div className="flex items-center gap-2">
                            {tieneDescuento ? (
                                <>
                                    {/* Precio con descuento */}
                                    <span className="text-xl font-bold text-red-600">
                                        ${precioFinal.toFixed(2)}
                                    </span>
                                    {/* Precio original tachado */}
                                    <span className="text-sm text-gray-400 line-through">
                                        ${producto.precio.toFixed(2)}
                                    </span>
                                </>
                            ) : (
                                /* Precio normal */
                                <span className="text-xl font-bold text-gray-800">
                                    ${producto.precio}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Add to Cart - Overlay */}
                    {producto.stock > 0 && (
                        <div className="absolute inset-0 flex items-center justify-start opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <span className="text-xl uppercase text-[#666666]">
                                ADD TO CART
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CardProducto;