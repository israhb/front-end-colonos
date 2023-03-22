import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import { TipoTransporte } from 'app/api/TipoTransporte';

@Injectable({
  providedIn: 'root'
})
export class STipoTransporteService {
    constructor(private http: HttpClient) { }

    headers = new HttpHeaders({
        "Access-Control-Allow-Origin": "*"
    });
    headers_post = new HttpHeaders({
        "Access-Control-Allow-Origin": "*",
        'Content-type': 'application/json'
    });

    getListarTipoTransporte(){
        const requestOptions = { headers: this.headers_post };
        return this.http.get<TipoTransporte[]>(`${environment.baseUrl}tipo-transporte`, requestOptions);
    }

    saveTipoTransporte(json: JSON){
        const requestOptions = { headers: this.headers_post };
        return this.http.post(`${environment.baseUrl}tipo-transporte`, json, requestOptions);
    }

    updateTipoTransporte(tipoTransporte_id: number, json: JSON){
        const requestOptions = { headers: this.headers_post };
        return this.http.patch(`${environment.baseUrl}tipo-transporte/${tipoTransporte_id}`, json, requestOptions);
    }

    deleteTipoTransporte(tipoTransporte_id: number){
        const requestOptions = { headers: this.headers_post };
        return this.http.delete(`${environment.baseUrl}tipo-transporte/${tipoTransporte_id}`, requestOptions);
    }
}
