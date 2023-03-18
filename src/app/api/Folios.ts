export interface Folios {
    id?: number;
    name?: string;
    mac?: string;
    nuevo?: number;
    upload_date?: string;
    upload_time?: string;
    activo?: number;
    estado_id?: number;
    frac_id?: number;
    estado?: Estado;
    fraccionamiento?: Fraccionamiento;
}

export interface Estado{
    id?: number;
    name?: string;
    activo?: number;
}

export interface Fraccionamiento{
    id?: number;
    name?: string;
    activo?: number;
    estado_id?: number;
}
