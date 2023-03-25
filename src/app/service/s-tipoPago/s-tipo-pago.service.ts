import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { TipoPago } from 'app/api/TipoPago';
import { ApisGeneralesService } from '../generales/apis-generales.service';

@Injectable({
  providedIn: 'root'
})
export class STipoPagoService {

    constructor(private http: HttpClient, private apisGeneralesService:ApisGeneralesService) { }
    requestOptions = { headers: this.apisGeneralesService.headers_post };

    getListarTipoP(){
        return this.http.get<TipoPago[]>(`${environment.baseUrl}tipo-pago`, this.requestOptions);
    }

    saveTipoP(json: JSON){
        return this.http.post(`${environment.baseUrl}tipo-pago`, json, this.requestOptions);
    }

    updateTipoP(tipoPago_id: number, json: JSON){
        return this.http.patch(`${environment.baseUrl}tipo-pago/${tipoPago_id}`, json, this.requestOptions);
    }

    deleteTipoP(tipoPago_id: number){
        return this.http.delete(`${environment.baseUrl}tipo-pago/${tipoPago_id}`, this.requestOptions);
    }
}
