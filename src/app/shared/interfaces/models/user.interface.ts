export interface IUsuario {
    id: string
    nombres?: string
    apellidos?: string
    email?: string
    rol?: string
    numero_documento?: string
    // entidad_id?: string
    activo: string
    password?: string
    nombre_completo?: string
}