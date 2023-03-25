import { Colono } from "./Colono"
import { TipoServicio } from "./TipoServicio"
import { TipoTransporte } from "./TipoTransporte"
import { TipoVisita } from "./TipoVisita"

export interface Visitas {
    id?: number;
    colono_id?: number;
    tipo_visita_id?: number;
    tipo_servicio_id?: number;
    tipo_transporte_id?: number;
    name?: string;
    visita_date?: string;
    visita_time?: string;
    numero_acom?: number;
    evento?: number;
    placas?: string;
    nota?: string;
    gps?: string;
    hash?: string;
    upload_date?: string;
    upload_time?: string;
    activo?: number;
    colono?: Colono;
    tipoVisita?: TipoVisita;
    tipoServicio?: TipoServicio;
    tipoTransporte?: TipoTransporte;

}
