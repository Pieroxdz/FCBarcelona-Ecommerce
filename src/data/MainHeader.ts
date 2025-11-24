// =================================================================
// 1. INTERFACES (COMPATIBLE CON TU COMPONENTE)
// =================================================================

import { useAuth } from "../AuthContext";

// Nivel 3: Sub-subcategoría (nietas) - NO tiene hijos
interface SubSubCategory {
    name: string;
    to: string;
}

// Nivel 2: Subcategoría (hijas) - PUEDE tener sub-subcategorías
interface SubCategory {
    name: string;
    to: string;
    subcategories?: SubSubCategory[]; // ⚠️ Cambiado a "subcategories" minúscula
}

// Nivel 1: Categoría principal (madres) - PUEDE tener subcategorías
interface MainCategory {
    name: string;
    to: string;
    subcategories?: SubCategory[]; // ⚠️ Cambiado a "subcategories" minúscula
}

// Nivel 0: Links principales del menú
interface MainLink {
    name: string;
    to: string;
    isDropdown: boolean;
    data?: MainCategory[]; // ⚠️ Cambiado a "data"
}

// =================================================================
// 2. DATOS COMPLETOS DEL MENÚ
// =================================================================

// 🔵 EQUIPACIONES
const equipacionesData: MainCategory[] = [
    {
        name: "PRIMERA EQUIPACIÓN",
        to: "/equipaciones/primera",
        subcategories: [
            { name: "HOMBRE", to: "/equipaciones/primera/hombre" },
            { name: "NIÑOS/AS Y BEBÉS", to: "/equipaciones/primera/ninos" },
            { name: "MUJER", to: "/equipaciones/primera/mujer" }
        ]
    },
    {
        name: "SEGUNDA EQUIPACIÓN",
        to: "/equipaciones/segunda",
        subcategories: [
            { name: "HOMBRE", to: "/equipaciones/segunda/hombre" },
            { name: "NIÑOS/AS Y BEBÉS", to: "/equipaciones/segunda/ninos" },
            { name: "MUJER", to: "/equipaciones/segunda/mujer" }
        ]
    },
    {
        name: "TERCERA EQUIPACIÓN",
        to: "/equipaciones/tercera",
        subcategories: [
            { name: "HOMBRE", to: "/equipaciones/tercera/hombre" },
            { name: "NIÑOS/AS Y BEBÉS", to: "/equipaciones/tercera/ninos" },
            { name: "MUJER", to: "/equipaciones/tercera/mujer" }
        ]
    },
    {
        name: "EQUIPACIONES DE PORTERO",
        to: "/equipaciones/portero"
    },
    {
        name: "OTROS DEPORTES",
        to: "/equipaciones/otros-deportes",
        subcategories: [
            { name: "BALONCESTO", to: "/equipaciones/otros-deportes/baloncesto" }
        ]
    }
];

// 🔵 ENTRENAMIENTO
const entrenamientoData: MainCategory[] = [
    {
        name: "HOMBRE",
        to: "/entrenamiento/hombre",
        subcategories: [
            { name: "Chaquetas y Sudaderas", to: "/entrenamiento/hombre/chaquetas-sudaderas" },
            { name: "Camisetas", to: "/entrenamiento/hombre/camisetas" },
            { name: "Pantalones y Shorts", to: "/entrenamiento/hombre/pantalones-shorts" },
            { name: "Chándals", to: "/entrenamiento/hombre/chandals" }
        ]
    },
    {
        name: "MUJER",
        to: "/entrenamiento/mujer",
        subcategories: [
            { name: "Chaquetas y Sudaderas", to: "/entrenamiento/mujer/chaquetas-sudaderas" },
            { name: "Camisetas", to: "/entrenamiento/mujer/camisetas" },
            { name: "Pantalones y Shorts", to: "/entrenamiento/mujer/pantalones-shorts" },
            { name: "Chándals", to: "/entrenamiento/mujer/chandals" }
        ]
    },
    {
        name: "NIÑOS/AS Y BEBÉS",
        to: "/entrenamiento/ninos",
        subcategories: [
            { name: "Chaquetas y Sudaderas", to: "/entrenamiento/ninos/chaquetas-sudaderas" },
            { name: "Camisetas", to: "/entrenamiento/ninos/camisetas" },
            { name: "Pantalones y Shorts", to: "/entrenamiento/ninos/pantalones-shorts" },
            { name: "Chándals", to: "/entrenamiento/ninos/chandals" }
        ]
    }
];

// 🟣 MODA
const modaData: MainCategory[] = [
    {
        name: "HOMBRE",
        to: "/moda/hombre",
        subcategories: [
            { name: "Sudaderas", to: "/moda/hombre/sudaderas" },
            { name: "Camisetas y Polos", to: "/moda/hombre/camisetas-polos" },
            { name: "Pantalones y Shorts", to: "/moda/hombre/pantalones-shorts" },
            { name: "Chándals", to: "/moda/hombre/chandals" },
            { name: "Abrigos y Chaquetas", to: "/moda/hombre/abrigos-chaquetas" }
        ]
    },
    {
        name: "MUJER",
        to: "/moda/mujer",
        subcategories: [
            { name: "Sudaderas y Jerséis", to: "/moda/mujer/sudaderas-jerseis" },
            { name: "Camisetas y Polos", to: "/moda/mujer/camisetas-polos" },
            { name: "Pantalones y Shorts", to: "/moda/mujer/pantalones-shorts" },
            { name: "Chándals", to: "/moda/mujer/chandals" },
            { name: "Abrigos y Chaquetas", to: "/moda/mujer/abrigos-chaquetas" }
        ]
    },
    {
        name: "NIÑOS/AS Y BEBÉS",
        to: "/moda/ninos",
        subcategories: [
            { name: "Sudaderas", to: "/moda/ninos/sudaderas" },
            { name: "Camisetas y Polos", to: "/moda/ninos/camisetas-polos" },
            { name: "Pantalones y Shorts", to: "/moda/ninos/pantalones-shorts" },
            { name: "Chándals", to: "/moda/ninos/chandals" },
            { name: "Abrigos y Chaquetas", to: "/moda/ninos/abrigos-chaquetas" },
            { name: "Bebés", to: "/moda/ninos/bebes" }
        ]
    },
    {
        name: "COLECCIONES",
        to: "/moda/colecciones",
        subcategories: [
            { name: "Colección Essentials", to: "/moda/colecciones/essentials" },
            { name: "Colección Cruyff", to: "/moda/colecciones/cruyff" },
            { name: "Colección Retiro", to: "/moda/colecciones/retiro" },
            { name: "Colección Barça Fan", to: "/moda/colecciones/barca-fan" },
            { name: "Colección Barça Kids", to: "/moda/colecciones/barca-kids" },
            { name: "Colección CAT", to: "/moda/colecciones/cat" }
        ]
    }
];

// 🟡 MEMORABILIA
const memorabiliaData: MainCategory[] = [
    { name: "Stadium Memorabilia", to: "/memorabilia/stadium" },
    { name: "Memorabilia Firmado", to: "/memorabilia/firmado" },
    { name: "Joyas con Diamantes", to: "/memorabilia/joyas-diamantes" }
];

// 🎁 REGALOS Y ACCESORIOS
const regalosAccesoriosData: MainCategory[] = [
    {
        name: "ACCESORIOS",
        to: "/regalos-accesorios/accesorios",
        subcategories: [
            { name: "Mochilas y Bolsas", to: "/regalos-accesorios/accesorios/mochilas-bolsas" },
            { name: "Gorras y Gorros", to: "/regalos-accesorios/accesorios/gorras-gorros" },
            { name: "Calcetines", to: "/regalos-accesorios/accesorios/calcetines" },
            { name: "Relojes y Joyería", to: "/regalos-accesorios/accesorios/relojes-joyeria" },
            { name: "Carteras", to: "/regalos-accesorios/accesorios/carteras" }
        ]
    },
    {
        name: "SOUVENIRS",
        to: "/regalos-accesorios/souvenirs",
        subcategories: [
            { name: "Bufandas y Banderas", to: "/regalos-accesorios/souvenirs/bufandas-banderas" },
            { name: "Balones", to: "/regalos-accesorios/souvenirs/balones" },
            { name: "Llaveros e Imanes", to: "/regalos-accesorios/souvenirs/llaveros-imanes" },
            { name: "Juegos", to: "/regalos-accesorios/souvenirs/juegos" },
            { name: "Libros", to: "/regalos-accesorios/souvenirs/libros" }
        ]
    },
    {
        name: "HOGAR",
        to: "/regalos-accesorios/hogar",
        subcategories: [
            { name: "Botellines y Tazas", to: "/regalos-accesorios/hogar/botellines-tazas" },
            { name: "Accesorios del Hogar", to: "/regalos-accesorios/hogar/accesorios" },
            { name: "Electrónica", to: "/regalos-accesorios/hogar/electronica" },
            { name: "Oficina y Papelería", to: "/regalos-accesorios/hogar/oficina-papeleria" }
        ]
    },
    {
        name: "ACCESORIOS FAN",
        to: "/regalos-accesorios/fan"
    }
];

// =================================================================
// 3. MENÚ PRINCIPAL - EXPORTAR
// =================================================================

export const mainLinks: MainLink[] = [
    { 
        name: "BEST SELLERS", 
        to: "/best-sellers", 
        isDropdown: false 
    },
    { 
        name: "EQUIPACIONES", 
        to: "/equipaciones", 
        isDropdown: true, 
        data: equipacionesData 
    },
    { 
        name: "ENTRENAMIENTO", 
        to: "/entrenamiento", 
        isDropdown: true, 
        data: entrenamientoData 
    },
    { 
        name: "MODA", 
        to: "/moda", 
        isDropdown: true, 
        data: modaData 
    },
    { 
        name: "MEMORABILIA", 
        to: "/memorabilia", 
        isDropdown: true, 
        data: memorabiliaData 
    },
    { 
        name: "PLANTILLA", 
        to: "/team", 
        isDropdown: false 
    },
    { 
        name: "REGALOS Y ACCESORIOS", 
        to: "/regalos-accesorios", 
        isDropdown: true, 
        data: regalosAccesoriosData 
    }
];


// =================================================================
// 4. EXPORTAR TIPOS
// =================================================================


export const useNavigation = () => {
    const { isAunthenticated } = useAuth();
    
    return mainLinks.filter(item => {
        // Si está autenticado, mostrar todo
        if (isAunthenticated) {
            return true;
        }
        
        // Si NO está autenticado, ocultar PLANTILLA y BEST SELLERS
        return item.name !== "PLANTILLA" && item.name !== "BEST SELLERS";
    });
};

export type { MainLink, MainCategory, SubCategory, SubSubCategory };