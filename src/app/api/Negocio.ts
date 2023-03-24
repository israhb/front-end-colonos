import { Colono } from "./Colono"
import { TipoNegocio } from "./TipoNegocio"

export interface Negocio{
    id?: number;
    tipo_negocio_id?: number;
    colono_id?: number;
    name?: string;
    telefono_1?: string;
    telefono_2?: string;
    foto_1?: string;
    foto_2?: string;
    foto_3?: string;
    foto_4?: string;
    direccion?: string;
    upload_date?: string;
    upload_time?: string;
    activo?: number;
    colono?: Colono;
    tipoNegocio?: TipoNegocio;
}
