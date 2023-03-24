import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Negocio } from 'app/api/Negocio';

@Injectable({
  providedIn: 'root'
})
export class SNegocioService {

    constructor(private http: HttpClient) { }

    headers = new HttpHeaders({
        "Access-Control-Allow-Origin": "*"
    });
    headers_post = new HttpHeaders({
        "Access-Control-Allow-Origin": "*",
        'Content-type': 'application/json'
    });

    getListarNegocios(){
        const requestOptions = { headers: this.headers_post };
        return this.http.get<Negocio[]>(`${environment.baseUrl}negocio`, requestOptions);
    }

    saveNegocio(json: JSON){
        const requestOptions = { headers: this.headers_post };
        return this.http.post(`${environment.baseUrl}negocio`, json, requestOptions);
    }

    updateNegocio(negocio_id: number, json: JSON){
        const requestOptions = { headers: this.headers_post };
        return this.http.patch(`${environment.baseUrl}negocio/${negocio_id}`, json, requestOptions);
    }

    deleteNegocio(negocio_id: number){
        const requestOptions = { headers: this.headers_post };
        return this.http.delete(`${environment.baseUrl}negocio/${negocio_id}`, requestOptions);
    }
}
