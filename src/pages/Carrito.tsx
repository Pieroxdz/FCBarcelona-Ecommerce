import { useState, useEffect } from 'react';

// Tipos
interface ItemCarrito {
    id: number;
    nombre: string;
    precio: number;
    imagen: string;
    cantidad: number;
}

export default function Carrito() {
    const [items, setItems] = useState<ItemCarrito[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    // Cargar carrito desde localStorage al montar el componente
    useEffect(() => {
        cargarCarrito();
        setLoading(false);

        // Escuchar cambios en localStorage (cuando se agrega desde otro componente)
        const handleStorageChange = () => {
            cargarCarrito();
        };

        window.addEventListener('storage', handleStorageChange);

        // Intervalo para actualizar el carrito cada segundo (para detectar cambios en la misma pestaña)
        const interval = setInterval(() => {
            cargarCarrito();
        }, 1000);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            clearInterval(interval);
        };
    }, []);

    // Cargar items del carrito desde localStorage
    const cargarCarrito = (): void => {
        try {
            const carritoStr = localStorage.getItem('carrito');
            if (carritoStr) {
                const carritoData = JSON.parse(carritoStr);
                // Asegurar que precio y cantidad sean números
                const carritoNormalizado = carritoData.map((item: any) => ({
                    ...item,
                    precio: Number(item.precio),
                    cantidad: Number(item.cantidad)
                }));
                setItems(carritoNormalizado);
            } else {
                setItems([]);
            }
        } catch (error) {
            console.error('Error al cargar el carrito:', error);
            setItems([]);
        }
    };

    // Actualizar cantidad de un producto
    const actualizarCantidad = (id: number, nuevaCantidad: number): void => {
        if (nuevaCantidad < 1) return;

        const itemsActualizados = items.map(item =>
            item.id === id ? { ...item, cantidad: nuevaCantidad } : item
        );

        setItems(itemsActualizados);
        localStorage.setItem('carrito', JSON.stringify(itemsActualizados));
    };

    // Eliminar producto del carrito
    const eliminarProducto = (id: number): void => {
        const itemsActualizados = items.filter(item => item.id !== id);
        setItems(itemsActualizados);
        localStorage.setItem('carrito', JSON.stringify(itemsActualizados));
    };

    // Actualizar todo el carrito (botón UPDATE CART)
    const actualizarCarrito = (): void => {
        localStorage.setItem('carrito', JSON.stringify(items));
        alert('Carrito actualizado correctamente');
    };

    // Calcular total
    const calcularTotal = (): number => {
        return items.reduce((total, item) => {
            return total + (item.precio * item.cantidad);
        }, 0);
    };

    // Proceder al checkout
    const procederCheckout = (): void => {
        if (items.length === 0) {
            alert('El carrito está vacío');
            return;
        }
        // Aquí puedes navegar a la página de checkout o procesar el pedido
        console.log('Proceder al checkout con:', items);
        alert('Redirigiendo al checkout...');
        // Si usas react-router: navigate('/checkout');
        // O puedes usar: window.location.href = '/checkout';
    };

    const volverProductos = (): void => {
        // Si usas react-router: navigate('/productos');
        // O puedes usar: window.location.href = '/productos';
        window.history.back();
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-xl text-gray-600">
                    <i className="fas fa-spinner fa-spin mr-2"></i>
                    Cargando carrito...
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4">
                {/* Título */}
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 uppercase tracking-wide">
                    Shopping Cart
                </h1>

                {items.length === 0 ? (
                    // Carrito vacío
                    <div className="bg-white rounded-lg shadow-sm p-8 md:p-12 text-center">
                        <i className="fas fa-shopping-cart text-6xl text-gray-300 mb-4"></i>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                            Tu carrito está vacío
                        </h2>
                        <p className="text-gray-600 mb-6">
                            Agrega productos para comenzar tu compra
                        </p>
                        <button
                            onClick={volverProductos}
                            className="px-8 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-semibold uppercase"
                        >
                            <i className="fas fa-arrow-left mr-2"></i>
                            Ir a productos
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Tabla de productos - Ocupa 2 columnas en desktop */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                                {/* Header de la tabla - Solo visible en desktop */}
                                <div className="hidden md:grid md:grid-cols-12 gap-4 bg-gray-100 px-6 py-4 font-semibold text-gray-700 uppercase text-sm">
                                    <div className="col-span-5">Product</div>
                                    <div className="col-span-2 text-center">Price</div>
                                    <div className="col-span-3 text-center">Quantity</div>
                                    <div className="col-span-2 text-right">Total</div>
                                </div>

                                {/* Lista de productos */}
                                <div className="divide-y divide-gray-200">
                                    {items.map((item) => (
                                        <div
                                            key={item.id}
                                            className="p-4 md:p-6 hover:bg-gray-50 transition-colors"
                                        >
                                            {/* Layout Mobile/Tablet */}
                                            <div className="md:hidden space-y-4">
                                                <div className="flex gap-4">
                                                    {/* Imagen */}
                                                    <div className="w-20 h-20 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
                                                        {item.imagen ? (
                                                            <img
                                                                src={item.imagen}
                                                                alt={item.nombre}
                                                                className="w-full h-full object-contain"
                                                            />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center">
                                                                <i className="fas fa-image text-gray-400 text-2xl"></i>
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* Nombre y precio */}
                                                    <div className="flex-1">
                                                        <h3 className="font-semibold text-gray-900 mb-1 uppercase text-sm">
                                                            {item.nombre}
                                                        </h3>
                                                        <p className="text-gray-600 font-semibold">
                                                            ${item.precio.toFixed(2)}
                                                        </p>
                                                    </div>

                                                    {/* Botón eliminar */}
                                                    <button
                                                        onClick={() => eliminarProducto(item.id)}
                                                        className="text-gray-400 hover:text-red-600 transition-colors h-fit"
                                                        title="Eliminar producto"
                                                    >
                                                        <i className="fas fa-times-circle text-xl"></i>
                                                    </button>
                                                </div>

                                                {/* Cantidad y total */}
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center border border-gray-300 rounded-lg">
                                                        <button
                                                            onClick={() => actualizarCantidad(item.id, item.cantidad - 1)}
                                                            className="px-3 py-2 hover:bg-gray-100 transition-colors text-gray-700"
                                                        >
                                                            <i className="fas fa-minus"></i>
                                                        </button>
                                                        <input
                                                            type="number"
                                                            value={item.cantidad}
                                                            onChange={(e) => actualizarCantidad(item.id, parseInt(e.target.value) || 1)}
                                                            className="w-14 text-center border-x border-gray-300 py-2 focus:outline-none font-semibold"
                                                            min="1"
                                                        />
                                                        <button
                                                            onClick={() => actualizarCantidad(item.id, item.cantidad + 1)}
                                                            className="px-3 py-2 hover:bg-gray-100 transition-colors text-gray-700"
                                                        >
                                                            <i className="fas fa-plus"></i>
                                                        </button>
                                                    </div>

                                                    <div className="text-right">
                                                        <span className="text-sm text-gray-600 block">Total</span>
                                                        <span className="text-lg font-bold text-gray-900">
                                                            ${(item.precio * item.cantidad).toFixed(2)}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Layout Desktop */}
                                            <div className="hidden md:grid md:grid-cols-12 gap-4 items-center">
                                                {/* Producto (imagen + nombre) */}
                                                <div className="col-span-5 flex items-center gap-4">
                                                    <button
                                                        onClick={() => eliminarProducto(item.id)}
                                                        className="text-gray-400 hover:text-red-600 transition-colors"
                                                        title="Eliminar producto"
                                                    >
                                                        <i className="fas fa-times-circle text-xl"></i>
                                                    </button>

                                                    <div className="w-20 h-20 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
                                                        {item.imagen ? (
                                                            <img
                                                                src={item.imagen}
                                                                alt={item.nombre}
                                                                className="w-full h-full object-contain"
                                                            />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center">
                                                                <i className="fas fa-image text-gray-400 text-2xl"></i>
                                                            </div>
                                                        )}
                                                    </div>

                                                    <h3 className="font-semibold text-gray-900 uppercase text-sm">
                                                        {item.nombre}
                                                    </h3>
                                                </div>

                                                {/* Precio */}
                                                <div className="col-span-2 text-center">
                                                    <span className="font-semibold text-gray-900">
                                                        ${item.precio.toFixed(2)}
                                                    </span>
                                                </div>

                                                {/* Cantidad */}
                                                <div className="col-span-3 flex justify-center">
                                                    <div className="flex items-center border border-gray-300 rounded-lg">
                                                        <button
                                                            onClick={() => actualizarCantidad(item.id, item.cantidad - 1)}
                                                            className="px-3 py-2 hover:bg-gray-100 transition-colors text-gray-700"
                                                        >
                                                            <i className="fas fa-minus"></i>
                                                        </button>
                                                        <input
                                                            type="number"
                                                            value={item.cantidad}
                                                            onChange={(e) => actualizarCantidad(item.id, parseInt(e.target.value) || 1)}
                                                            className="w-16 text-center border-x border-gray-300 py-2 focus:outline-none font-semibold"
                                                            min="1"
                                                        />
                                                        <button
                                                            onClick={() => actualizarCantidad(item.id, item.cantidad + 1)}
                                                            className="px-3 py-2 hover:bg-gray-100 transition-colors text-gray-700"
                                                        >
                                                            <i className="fas fa-plus"></i>
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Total */}
                                                <div className="col-span-2 text-right">
                                                    <span className="text-lg font-bold text-gray-900">
                                                        ${(item.precio * item.cantidad).toFixed(2)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Botón Update Cart */}
                                <div className="p-4 md:p-6 bg-gray-50 border-t border-gray-200">
                                    <button
                                        onClick={actualizarCarrito}
                                        className="w-full md:w-auto px-8 py-3 border-2 border-gray-900 text-gray-900 rounded-lg hover:bg-gray-900 hover:text-white transition-colors font-semibold uppercase"
                                    >
                                        <i className="fas fa-sync-alt mr-2"></i>
                                        Update Cart
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Cart Totals - Ocupa 1 columna en desktop */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
                                <h2 className="text-xl font-bold text-gray-900 mb-6 uppercase">
                                    Cart Totals
                                </h2>

                                {/* Total */}
                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between items-center py-4 border-t border-gray-200">
                                        <span className="text-lg font-semibold text-gray-900">Total</span>
                                        <span className="text-2xl font-bold text-gray-900">
                                            ${calcularTotal().toFixed(2)}
                                        </span>
                                    </div>
                                </div>

                                {/* Botón Checkout */}
                                <button
                                    onClick={procederCheckout}
                                    className="w-full py-4 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-semibold uppercase tracking-wide"
                                >
                                    Proceed To Checkout
                                </button>

                                {/* Continuar comprando */}
                                <button
                                    onClick={volverProductos}
                                    className="w-full mt-3 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-gray-900 hover:text-gray-900 transition-colors font-medium"
                                >
                                    <i className="fas fa-arrow-left mr-2"></i>
                                    Continue Shopping
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}