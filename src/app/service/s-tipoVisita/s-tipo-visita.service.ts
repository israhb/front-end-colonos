import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import { TipoVisita } from 'app/api/TipoVisita';

@Injectable({
  providedIn: 'root'
})
export class STipoVisitaService {

    constructor(private http: HttpClient) { }

    headers = new HttpHeaders({
        "Access-Control-Allow-Origin": "*"
    });
    headers_post = new HttpHeaders({
        "Access-Control-Allow-Origin": "*",
        'Content-type': 'application/json'
    });

    getListarTipoVisita(){
        const requestOptions = { headers: this.headers_post };
        return this.http.get<TipoVisita[]>(`${environment.baseUrl}tipo-visita`, requestOptions);
    }

    saveTipoVisita(json: JSON){
        const requestOptions = { headers: this.headers_post };
        return this.http.post(`${environment.baseUrl}tipo-visita`, json, requestOptions);
    }

    updateTipoVisita(tipoVisita_id: number, json: JSON){
        const requestOptions = { headers: this.headers_post };
        return this.http.patch(`${environment.baseUrl}tipo-visita/${tipoVisita_id}`, json, requestOptions);
    }

    deleteTipoVisita(tipoVisita_id: number){
        const requestOptions = { headers: this.headers_post };
        return this.http.delete(`${environment.baseUrl}tipo-visita/${tipoVisita_id}`, requestOptions);
    }
}
