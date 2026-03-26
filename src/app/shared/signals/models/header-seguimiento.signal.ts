import { signal } from "@angular/core";
import { IHeaderExpediente } from "../../interfaces/models/expediente.interface";

export const _header_seguimiento = signal<IHeaderExpediente>({
    id: '',
    codigo: '',
    titulo: '',
    descripcion: '',
    entidades: [],
    numero_contrato: ''
})
