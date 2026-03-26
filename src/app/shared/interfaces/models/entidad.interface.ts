import { IUsuario } from "./user.interface"

export interface IEntidad extends IUsuario {
    razon_social?: string
    telefono?: string
    direccion?: string
    representante_legal?: string
    fecha_creacion?: string
    principal?: string
}