import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo-simple-white.svg";

// =================================================================
// 1. INTERFACES DE TYPESCRIPT PARA LA ESTRUCTURA DEL MENÚ
// =================================================================

interface SubCategory {
    name: string;
    to: string;
}

interface MenuItem {
    name: string;
    to: string;
    subcategories?: SubCategory[];
}

interface MainLink {
    name: string;
    to: string;
    isDropdown: boolean;
    data?: MenuItem[];
}

// =================================================================
// 2. ESTRUCTURA DE DATOS
// =================================================================

const equipacionesMenuData: MenuItem[] = [
    {
        name: "PRIMERA EQUIPACIÓN",
        to: "/equipaciones/1",
        subcategories: [
            { name: "HOMBRE", to: "/equipaciones/1/1" },
            { name: "NIÑOS/AS Y BEBÉS", to: "/equipaciones/1/2" },
            { name: "MUJER", to: "/equipaciones/1/3" }
        ]
    },
    {
        name: "SEGUNDA EQUIPACIÓN",
        to: "/equipaciones/2",
        subcategories: [
            { name: "HOMBRE", to: "/equipaciones/2/4" },
            { name: "NIÑOS/AS Y BEBÉS", to: "/equipaciones/2/5" },
            { name: "MUJER", to: "/equipaciones/2/6" }
        ]
    },
    {
        name: "TERCERA EQUIPACIÓN",
        to: "/equipaciones/3",
        subcategories: [
            { name: "HOMBRE", to: "/equipaciones/3/7" },
            { name: "NIÑOS/AS Y BEBÉS", to: "/equipaciones/3/8" },
            { name: "MUJER", to: "/equipaciones/3/9" }
        ]
    },
    {
        name: "EQUIPACIONES DE PORTERO",
        to: "/equipaciones/4"
    },
    {
        name: "OTROS DEPORTES",
        to: "/equipaciones/5",
        subcategories: [
            { name: "BALONCESTO", to: "/equipaciones/5/10" }
        ]
    }
];

const mainLinks: MainLink[] = [
    { name: "BEST SELLERS", to: "/best-sellers", isDropdown: false },
    { name: "EQUIPACIONES", to: "/equipaciones", isDropdown: true, data: equipacionesMenuData },
    { name: "ENTRENAMIENTO", to: "/entrenamiento", isDropdown: false },
    { name: "EQUIPACIONES", to: "/equipaciones", isDropdown: true, data: equipacionesMenuData },
    { name: "PLANTILLA", to: "/team", isDropdown: false },
    { name: "REGALOS Y ACCESORIOS", to: "/regalos-accesorios", isDropdown: false },
];

// =================================================================
// 3. COMPONENTE RECURSIVO PARA EL MENÚ MÓVIL
// =================================================================

interface MobileDropdownItemProps {
    item: MenuItem | SubCategory | MainLink;
    level?: number;
}

const MobileDropdownItem: React.FC<MobileDropdownItemProps> = ({ item, level = 0 }) => {
    const menuItem = item as MenuItem;
    const [isOpen, setIsOpen] = useState(false);

    if (!menuItem.subcategories || menuItem.subcategories.length === 0) {
        return (
            <li className="py-2 hover:text-yellow-500 transition duration-150">
                <Link to={menuItem.to} className="block">
                    {menuItem.name}
                </Link>
            </li>
        );
    }

    return (
        <li className="py-2">
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="flex justify-between items-center cursor-pointer text-sm font-medium hover:text-yellow-500 transition duration-150"
            >
                <Link to={menuItem.to} onClick={(e) => e.stopPropagation()} className="block uppercase" style={{ fontWeight: level === 0 ? 'bold' : 'normal', paddingLeft: `${level * 8}px` }}>
                    {menuItem.name}
                </Link>
                <i className={`fa-solid ${isOpen ? 'fa-chevron-up' : 'fa-chevron-down'} text-xs ml-2`}></i>
            </div>
            {isOpen && (
                <ul className="mt-1 pl-4 text-xs font-normal">
                    {menuItem.subcategories.map((subItem, index) => (
                        <MobileDropdownItem key={index} item={subItem} level={level + 1} />
                    ))}
                </ul>
            )}
        </li>
    );
};

// =================================================================
// 4. COMPONENTE PRINCIPAL
// =================================================================

const MainHeader: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>
            <header id="main-header" className="bg-[#181733] text-white py-4 sticky top-0 z-50 shadow-lg">
                <div className="max-w-7xl mx-auto px-4">
                    <nav className="flex justify-between items-center h-10">
                        {/* Logo */}
                        <div className="flex-shrink-0">
                            <Link to="/">
                                <img src={logo} alt="Barça Official Store Logo" />
                            </Link>
                        </div>

                        {/* NAVIGACIÓN DESKTOP */}
                        <ul className="hidden md:flex items-center gap-6 lg:gap-8">
                            {mainLinks.map((link, index) => (
                                <li key={index} className="relative group h-full flex items-center">
                                    <Link to={link.to} className="block py-2 text-sm uppercase tracking-wide font-medium hover:text-yellow-400 transition-colors duration-200">
                                        {link.name}
                                    </Link>

                                    {/* Subrayado Hover */}
                                    <div className="absolute bottom-0 left-0 w-full h-[3px] bg-yellow-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></div>

                                    {/* DROPDOWN MEGA MENU */}
                                    {link.isDropdown && link.data && (
                                        <>
                                            {/* Overlay invisible para mantener el hover */}
                                            <div className="absolute left-0 right-0 top-full h-4 opacity-0 group-hover:opacity-100"></div>

                                            {/* Dropdown full width */}
                                            <div className="fixed left-0 right-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50" style={{ top: 'var(--header-height, 64px)' }}>
                                                <div className="bg-[#1a1838] border-t-2 border-yellow-500 shadow-2xl">
                                                    <div className="w-full px-16 py-12">
                                                        <div className="grid grid-cols-5 gap-16 max-w-[1600px] mx-auto">
                                                            {link.data.map((item, itemIndex) => (
                                                                <div key={itemIndex}>
                                                                    <Link
                                                                        to={item.to}
                                                                        className="text-sm font-bold text-white uppercase hover:text-yellow-400 block transition duration-200 pb-3 border-b border-white/10 mb-4"
                                                                    >
                                                                        {item.name}
                                                                    </Link>
                                                                    {item.subcategories && item.subcategories.length > 0 && (
                                                                        <ul className="space-y-2.5">
                                                                            {item.subcategories.map((sub, subIndex) => (
                                                                                <li key={subIndex}>
                                                                                    <Link
                                                                                        to={sub.to}
                                                                                        className="text-sm text-gray-300 hover:text-yellow-400 hover:translate-x-1 block transition-all duration-200"
                                                                                    >
                                                                                        {sub.name}
                                                                                    </Link>
                                                                                </li>
                                                                            ))}
                                                                        </ul>
                                                                    )}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </li>
                            ))}
                        </ul>

                        {/* ÍCONOS Y HAMBURGUESA */}
                        <div className="flex items-center gap-4">
                            <a href="#" aria-label="Mi Cuenta">
                                <i className="fa-solid fa-user text-white text-lg hover:text-yellow-500 transition duration-150"></i>
                            </a>
                            <a href="#" aria-label="Mi Carrito" className="relative">
                                <i className="fa-solid fa-cart-shopping text-white text-lg hover:text-yellow-500 transition duration-150"></i>
                            </a>

                            <button
                                className="md:hidden p-1 ml-2 text-xl"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                aria-label="Abrir Menú"
                            >
                                <i className={`fa-solid ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-white`}></i>
                            </button>
                        </div>
                    </nav>
                </div>

                {/* MENÚ DESPLEGABLE MÓVIL */}
                <div
                    className={`md:hidden absolute top-full left-0 w-full bg-[#181733] shadow-xl transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-screen opacity-100 border-t border-white/20' : 'max-h-0 opacity-0 overflow-hidden'}`}
                >
                    <div className="px-6 py-4">
                        <ul className="flex flex-col divide-y divide-white/10 text-white font-semibold">
                            {mainLinks.map((link, index) => (
                                <React.Fragment key={index}>
                                    {link.isDropdown && link.data ? (
                                        <MobileDropdownItem
                                            item={{ name: link.name, to: link.to, subcategories: link.data }}
                                        />
                                    ) : (
                                        <li className="py-2 hover:bg-black/20 px-1 -mx-1 transition duration-150 uppercase">
                                            <Link to={link.to} className="block">{link.name}</Link>
                                        </li>
                                    )}
                                </React.Fragment>
                            ))}
                        </ul>
                    </div>

                    <div className="mt-4 p-6 bg-black/10 text-xs border-t border-white/10">
                        <p className="text-yellow-500 font-bold mb-1">SERVICIO AL CLIENTE</p>
                        <p className="text-gray-400">info@ejemplo.com</p>
                    </div>
                </div>
            </header>

            {/* Link FontAwesome para los iconos */}
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        </>
    );
}

export default MainHeader;