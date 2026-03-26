import { signal } from "@angular/core";
import { IAbogado } from "../../interfaces/models/abogado.interface";

export const _abogado = signal<IAbogado>({
    id: '',
    numero_documento: '',
    email: '',
    nombres: '',
    password: '',
    rol: '',
    apellidos: '',
    activo: '1',
    anio_graduacion: '',
    colegiatura: '',
    especialidad: '',
    estado_colegiatura: '',
    universidad: ''
})