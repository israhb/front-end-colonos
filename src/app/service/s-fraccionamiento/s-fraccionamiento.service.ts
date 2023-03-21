import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Fraccionamiento } from 'app/api/Fraccionamiento';

@Injectable({
  providedIn: 'root'
})
export class SFraccionamientoService {

    constructor(private http: HttpClient) { }

    headers = new HttpHeaders({
        "Access-Control-Allow-Origin": "*"
    });
    headers_post = new HttpHeaders({
        "Access-Control-Allow-Origin": "*",
        'Content-type': 'application/json'
    });

    getListarFraccionamientos(){
        const requestOptions = { headers: this.headers_post };
        return this.http.get<Fraccionamiento[]>(`${environment.baseUrl}fraccionamiento`, requestOptions);
    }

    getLsitadoFraccByIdstado(estado_id: number){
        const requestOptions = { headers: this.headers_post };
        return this.http.get<Fraccionamiento[]>(`${environment.baseUrl}fraccionamiento/forEstadoId/${estado_id}`, requestOptions);
    }

    saveFraccionamiento(json: JSON){
        const requestOptions = { headers: this.headers_post };
        return this.http.post(`${environment.baseUrl}fraccionamiento`, json, requestOptions);
    }

    updateFraccionamiento(frac_id: number, json: JSON){
        const requestOptions = { headers: this.headers_post };
        return this.http.patch(`${environment.baseUrl}fraccionamiento/${frac_id}`, json, requestOptions);
    }

    deleteFraccionamientoS(frac_id: number){
        const requestOptions = { headers: this.headers_post };
        return this.http.delete(`${environment.baseUrl}fraccionamiento/${frac_id}`, requestOptions);
    }
}
