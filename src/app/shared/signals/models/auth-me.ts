import { signal } from "@angular/core";
import { IAuthMe } from "../../interfaces/models/auth-me";

export const _authMe = signal<IAuthMe>({
    id: '',
    email: '',
    nombre_completo: '',
    rol: '',
    entidad_id: '',
    razon_social: '',
    jti: '',
    principal: []
})