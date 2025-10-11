import type { Producto } from "./Producto";

export interface ProductoDetalle extends Producto {
    categoria_nombre: string | null;
    subcategoria_nombre: string | null;
    sub_subcategoria_nombre: string | null;
    imagenes: string[];
}