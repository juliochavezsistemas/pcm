export interface IAuthMe {
    id: string,
    email: string,
    rol: string,
    nombre_completo: string,
    entidad_id: string,
    razon_social: string,
    jti: string,
    principal: string[]
}