import { Colono } from "./Colono";
import { TipoPago } from "./TipoPago";

export interface Pago{
    id?: number;
    colono_id?: number;
    tipo_pago_id?: number;
    name?: string;
    monto?: number;
    activo?: number;
    upload_date?: string;
    upload_time?: string;
    colono?: Colono;
    tipoPago?: TipoPago;
}
