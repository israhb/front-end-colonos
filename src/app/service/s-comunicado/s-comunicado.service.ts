import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Comunicado } from 'app/api/Comunicado';

@Injectable({
  providedIn: 'root'
})
export class SComunicadoService {

    constructor(private http: HttpClient) { }

    headers = new HttpHeaders({
        "Access-Control-Allow-Origin": "*"
    });
    headers_post = new HttpHeaders({
        "Access-Control-Allow-Origin": "*",
        'Content-type': 'application/json'
    });

    getListarComunicado(){
        const requestOptions = { headers: this.headers_post };
        return this.http.get<Comunicado[]>(`${environment.baseUrl}comunicado`, requestOptions);
    }

    saveComunicado(json: JSON){
        const requestOptions = { headers: this.headers_post };
        return this.http.post(`${environment.baseUrl}comunicado`, json, requestOptions);
    }

    updateComunicado(comunicado_id: number, json: JSON){
        const requestOptions = { headers: this.headers_post };
        return this.http.patch(`${environment.baseUrl}comunicado/${comunicado_id}`, json, requestOptions);
    }

    deleteComunicado(comunicado_id: number){
        const requestOptions = { headers: this.headers_post };
        return this.http.delete(`${environment.baseUrl}comunicado/${comunicado_id}`, requestOptions);
    }
}
