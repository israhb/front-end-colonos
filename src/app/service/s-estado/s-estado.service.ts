import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Estado } from 'app/api/Estado';
import { ApisGeneralesService } from '../generales/apis-generales.service';

@Injectable({
  providedIn: 'root'
})
export class SEstadoService {

    constructor(private http: HttpClient, private apisGeneralesService:ApisGeneralesService) { }
    requestOptions = { headers: this.apisGeneralesService.headers_post };

    getListarEstados(){
        return this.http.get<Estado[]>(`${environment.baseUrl}estado`, this.requestOptions);
    }

    saveEstado(json: JSON){
        return this.http.post(`${environment.baseUrl}estado`, json, this.requestOptions);
    }

    updateEstado(estado_id: number, json: JSON){
        return this.http.patch(`${environment.baseUrl}estado/${estado_id}`, json, this.requestOptions);
    }

    deleteEstadoS(estado_id: number){
        return this.http.delete(`${environment.baseUrl}estado/${estado_id}`, this.requestOptions);
    }
}
