import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Estado } from 'app/api/Estado';

@Injectable({
  providedIn: 'root'
})
export class SEstadoService {

    constructor(private http: HttpClient) { }

    headers = new HttpHeaders({
        "Access-Control-Allow-Origin": "*"
    });
    headers_post = new HttpHeaders({
        "Access-Control-Allow-Origin": "*",
        'Content-type': 'application/json'
    });

    getListarEstados(){
        const requestOptions = { headers: this.headers_post };
        return this.http.get<Estado[]>(`${environment.baseUrl}estado`, requestOptions);
    }

    saveEstado(json: JSON){
        const requestOptions = { headers: this.headers_post };
        return this.http.post(`${environment.baseUrl}estado`, json, requestOptions);
    }

    updateEstado(estado_id: number, json: JSON){
        const requestOptions = { headers: this.headers_post };
        return this.http.patch(`${environment.baseUrl}estado/${estado_id}`, json, requestOptions);
    }

    deleteEstadoS(estado_id: number){
        const requestOptions = { headers: this.headers_post };
        return this.http.delete(`${environment.baseUrl}estado/${estado_id}`, requestOptions);
    }
}
