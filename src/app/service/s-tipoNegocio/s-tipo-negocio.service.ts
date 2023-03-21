import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import { TipoNegocio } from 'app/api/TipoNegocio';

@Injectable({
  providedIn: 'root'
})
export class STipoNegocioService {

    constructor(private http: HttpClient) { }

    headers = new HttpHeaders({
        "Access-Control-Allow-Origin": "*"
    });
    headers_post = new HttpHeaders({
        "Access-Control-Allow-Origin": "*",
        'Content-type': 'application/json'
    });

    getListarTipoN(){
        const requestOptions = { headers: this.headers_post };
        return this.http.get<TipoNegocio[]>(`${environment.baseUrl}tipo-negocio`, requestOptions);
    }

    saveTipoN(json: JSON){
        const requestOptions = { headers: this.headers_post };
        return this.http.post(`${environment.baseUrl}tipo-negocio`, json, requestOptions);
    }

    updateTipoN(tipoNegocio_id: number, json: JSON){
        const requestOptions = { headers: this.headers_post };
        return this.http.patch(`${environment.baseUrl}tipo-negocio/${tipoNegocio_id}`, json, requestOptions);
    }

    deleteTipoNS(tipoNegocio_id: number){
        const requestOptions = { headers: this.headers_post };
        return this.http.delete(`${environment.baseUrl}tipo-negocio/${tipoNegocio_id}`, requestOptions);
    }
}
