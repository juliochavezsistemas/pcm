import { signal } from "@angular/core";
import { IUsuario } from "../../interfaces/models/user.interface";

export const _user = signal<IUsuario>({
    id: '',
    numero_documento: '',
    email: '',
    nombres: '',
    password: '',
    rol: '',
    apellidos: '',
    activo: '1'
})