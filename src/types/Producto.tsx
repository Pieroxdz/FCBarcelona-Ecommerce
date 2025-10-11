export interface Producto {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    precio_oferta: number;
    imagen: string;
    slug: string;
    stock: number;
    id_sub_subcategoria: number | null;
    activo: boolean;
    creado_en: string;
}
