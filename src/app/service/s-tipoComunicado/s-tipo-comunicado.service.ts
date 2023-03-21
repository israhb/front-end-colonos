import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import { TipoComunicado } from 'app/api/TipoComunicado';

@Injectable({
  providedIn: 'root'
})
export class STipoComunicadoService {

    constructor(private http: HttpClient) { }

    headers = new HttpHeaders({
        "Access-Control-Allow-Origin": "*"
    });
    headers_post = new HttpHeaders({
        "Access-Control-Allow-Origin": "*",
        'Content-type': 'application/json'
    });

    getListarTipoC(){
        const requestOptions = { headers: this.headers_post };
        return this.http.get<TipoComunicado[]>(`${environment.baseUrl}tipo-comunicado`, requestOptions);
    }

    saveTipoC(json: JSON){
        const requestOptions = { headers: this.headers_post };
        return this.http.post(`${environment.baseUrl}tipo-comunicado`, json, requestOptions);
    }

    updateTipoC(tipoComunicado_id: number, json: JSON){
        const requestOptions = { headers: this.headers_post };
        return this.http.patch(`${environment.baseUrl}tipo-comunicado/${tipoComunicado_id}`, json, requestOptions);
    }

    deleteTipoCS(tipoComunicado_id: number){
        const requestOptions = { headers: this.headers_post };
        return this.http.delete(`${environment.baseUrl}tipo-comunicado/${tipoComunicado_id}`, requestOptions);
    }
}
