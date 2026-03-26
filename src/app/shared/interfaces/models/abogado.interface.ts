import { IUsuario } from "./user.interface";

export interface IAbogado extends IUsuario {
    colegiatura: string
    universidad: string
    especialidad: string
    estado_colegiatura: string
    anio_graduacion: string
}