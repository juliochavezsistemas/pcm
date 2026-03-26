export interface IExpediente {
    id: string
    codigo?: string
    titulo?: string
    descripcion?: string
    activo?: string
    fecha_creacion?: string
    estado?: string
    abogado?: boolean
    numero_contrato?: string
}

export interface IHeaderExpediente {
    id: string
    numero_contrato: string
    codigo: string
    titulo: string
    descripcion: string
    entidades: IEntidadWithAbogado[]
}

export interface IEntidadWithAbogado {
    entidad_id: string
    razon_social: string
    tipo_parte: string
    abogado?: string[]
    fecha_creacion?: string
}