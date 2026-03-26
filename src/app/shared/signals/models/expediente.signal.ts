import { signal } from "@angular/core";
import { IExpediente } from "../../interfaces/models/expediente.interface";

export const _expediente = signal<IExpediente>({
    id: '',
    activo: '1',
    abogado: false
})