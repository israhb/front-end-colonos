import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import { TipoServicio } from 'app/api/TipoServicio';

@Injectable({
  providedIn: 'root'
})
export class STipoServicioService {

    constructor(private http: HttpClient) { }

    headers = new HttpHeaders({
        "Access-Control-Allow-Origin": "*"
    });
    headers_post = new HttpHeaders({
        "Access-Control-Allow-Origin": "*",
        'Content-type': 'application/json'
    });

    getListarTipoS(){
        const requestOptions = { headers: this.headers_post };
        return this.http.get<TipoServicio[]>(`${environment.baseUrl}tipo-servicio`, requestOptions);
    }

    saveTipoS(json: JSON){
        const requestOptions = { headers: this.headers_post };
        return this.http.post(`${environment.baseUrl}tipo-servicio`, json, requestOptions);
    }

    updateTipoS(tipoServicio_id: number, json: JSON){
        const requestOptions = { headers: this.headers_post };
        return this.http.patch(`${environment.baseUrl}tipo-servicio/${tipoServicio_id}`, json, requestOptions);
    }

    deleteTipoS(tipoServicio_id: number){
        const requestOptions = { headers: this.headers_post };
        return this.http.delete(`${environment.baseUrl}tipo-servicio/${tipoServicio_id}`, requestOptions);
    }
}
