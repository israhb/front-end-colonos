import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import { TipoPago } from 'app/api/TipoPago';

@Injectable({
  providedIn: 'root'
})
export class STipoPagoService {

    constructor(private http: HttpClient) { }

    headers = new HttpHeaders({
        "Access-Control-Allow-Origin": "*"
    });
    headers_post = new HttpHeaders({
        "Access-Control-Allow-Origin": "*",
        'Content-type': 'application/json'
    });

    getListarTipoP(){
        const requestOptions = { headers: this.headers_post };
        return this.http.get<TipoPago[]>(`${environment.baseUrl}tipo-pago`, requestOptions);
    }

    saveTipoP(json: JSON){
        const requestOptions = { headers: this.headers_post };
        return this.http.post(`${environment.baseUrl}tipo-pago`, json, requestOptions);
    }

    updateTipoP(tipoPago_id: number, json: JSON){
        const requestOptions = { headers: this.headers_post };
        return this.http.patch(`${environment.baseUrl}tipo-pago/${tipoPago_id}`, json, requestOptions);
    }

    deleteTipoP(tipoPago_id: number){
        const requestOptions = { headers: this.headers_post };
        return this.http.delete(`${environment.baseUrl}tipo-pago/${tipoPago_id}`, requestOptions);
    }
}
