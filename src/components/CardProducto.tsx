import { useNavigate } from "react-router-dom";
import type { Producto } from "../types/Producto";
import type { ProductoDetalle } from "../types/ProductoDetalle";

interface CardProductoProps {
    producto: Producto | ProductoDetalle;
}

const CardProducto = ({ producto }: CardProductoProps) => {
    const navigate = useNavigate();

    // Calcular precio final y descuento
    const precioFinal = producto.precio_oferta || producto.precio;
    const tieneDescuento =
        producto.precio_oferta !== null && producto.precio_oferta < producto.precio;

    // Construir texto de categorías (solo si vienen del backend)
    const categoriaTexto =
        "categoria_nombre" in producto
            ? [
                producto.categoria_nombre,
                producto.subcategoria_nombre,
                producto.sub_subcategoria_nombre,
            ]
                .filter(Boolean)
                .join(" › ")
            : null;

    return (
        <div
            className={`bg-white rounded-lg overflow-hidden ${producto.stock > 0
                ? "group cursor-pointer"
                : "group cursor-pointer opacity-75"
                }`}
            onClick={() => navigate(`/producto/${producto.id}`)}
        >
            {/* Imagen del producto */}
            <div className="relative bg-gray-100 aspect-square overflow-hidden">
                <img
                    src={producto.imagen || "/placeholder-product.jpg"}
                    alt={producto.nombre}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* Badge "Sin Stock" */}
                {producto.stock === 0 && (
                    <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded text-sm font-semibold z-10">
                        <i className="fas fa-times-circle mr-1"></i>
                        Agotado
                    </div>
                )}

                {/* Iconos de acción en hover */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 z-10 opacity-0 group-hover:opacity-100 group-hover:top-1/2 transition-all duration-500 flex gap-2 transform -translate-y-1/2">
                    <button
                        className="bg-black text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors duration-200 shadow-md"
                        onClick={(e) => {
                            e.stopPropagation();
                            console.log('Agregar a favoritos:', producto.nombre);
                        }}
                    >
                        <i className="far fa-heart"></i>
                    </button>

                    <button
                        className="bg-black text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors duration-200 shadow-md"
                        onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/producto/${producto.id}`);
                        }}
                    >
                        <i className="far fa-eye"></i>
                    </button>

                    <button
                        className="bg-black text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors duration-200 shadow-md"
                        onClick={(e) => {
                            e.stopPropagation();
                            console.log('Comparar producto:', producto.nombre);
                        }}
                    >
                        <i className="fas fa-exchange-alt"></i>
                    </button>
                </div>
            </div>

            {/* Información del producto */}
            <div className="p-4">
                {/* Categoría */}
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-2 line-clamp-1">
                    {categoriaTexto || "Sin categoría"}
                </p>

                {/* Estrellas (placeholder) */}
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

                {/* Precio / Add to Cart */}
                <div className="relative mb-3 h-6">
                    {/* Precio */}
                    <div
                        className={`transition-opacity duration-500 ${producto.stock > 0 ? "group-hover:opacity-0" : ""
                            }`}
                    >
                        <div className="flex items-center gap-2">
                            {tieneDescuento ? (
                                <>
                                    <span className="text-xl font-bold">
                                        S/ {precioFinal.toFixed(2)}
                                    </span>
                                    <span className="text-sm text-gray-400 line-through">
                                        S/ {producto.precio.toFixed(2)}
                                    </span>
                                </>
                            ) : (
                                <span className="text-xl font-bold text-gray-800">
                                    S/ {producto.precio.toFixed(2)}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Add to Cart / Sin Stock */}
                    <div className="absolute inset-0 flex items-center justify-start opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        {producto.stock > 0 ? (
                            <span className="text-xl uppercase text-[#666666]">
                                ADD TO CART
                            </span>
                        ) : (
                            <span className="text-xl uppercase text-red-600">
                                SIN STOCK
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardProducto;