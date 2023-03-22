import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Pago } from 'app/api/Pago';

@Injectable({
  providedIn: 'root'
})
export class SPagoService {

    constructor(private http: HttpClient) { }

    headers = new HttpHeaders({
        "Access-Control-Allow-Origin": "*"
    });
    headers_post = new HttpHeaders({
        "Access-Control-Allow-Origin": "*",
        'Content-type': 'application/json'
    });

    getListarPago(){
        const requestOptions = { headers: this.headers_post };
        return this.http.get<Pago[]>(`${environment.baseUrl}pago`, requestOptions);
    }

    savePago(json: JSON){
        const requestOptions = { headers: this.headers_post };
        return this.http.post(`${environment.baseUrl}pago`, json, requestOptions);
    }

    updatePago(pago_id: number, json: JSON){
        const requestOptions = { headers: this.headers_post };
        return this.http.patch(`${environment.baseUrl}pago/${pago_id}`, json, requestOptions);
    }

    deletePago(pago_id: number){
        const requestOptions = { headers: this.headers_post };
        return this.http.delete(`${environment.baseUrl}pago/${pago_id}`, requestOptions);
    }
}
