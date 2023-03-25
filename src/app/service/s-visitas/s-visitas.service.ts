 import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Visitas } from 'app/api/Visitas';
import { ApisGeneralesService } from '../generales/apis-generales.service';

@Injectable({
  providedIn: 'root'
})
export class SVisitasService {

    constructor(private http: HttpClient, private apisGeneralesService:ApisGeneralesService) { }
    requestOptions = { headers: this.apisGeneralesService.headers_post };

    getListarVisita(){

        return this.http.get<Visitas[]>(`${environment.baseUrl}visita`, this.requestOptions);
    }

    saveVisita(json: JSON){
        return this.http.post(`${environment.baseUrl}visita`, json, this.requestOptions);
    }

    updateVisita(visita_id: number, json: JSON){
        return this.http.patch(`${environment.baseUrl}visita/${visita_id}`, json, this.requestOptions);
    }

    deleteVisita(visita_id: number){
        return this.http.delete(`${environment.baseUrl}visita/${visita_id}`, this.requestOptions);
    }
}
