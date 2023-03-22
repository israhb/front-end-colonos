import { Colono } from "./Colono"
import { TipoComunicado } from "./TipoComunicado"

export interface Comunicado{
    id?: number;
    tipo_comunicado_id?: number;
    colono_id?: number;
    name?: string;
    foto_1?: string;
    foto_2?: string;
    activo?: number;
    colono?: Colono;
    tipoComunicado?: TipoComunicado;
}
