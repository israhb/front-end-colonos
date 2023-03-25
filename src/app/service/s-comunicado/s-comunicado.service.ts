import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Comunicado } from 'app/api/Comunicado';
import { ApisGeneralesService } from '../generales/apis-generales.service';

@Injectable({
  providedIn: 'root'
})
export class SComunicadoService {

    constructor(private http: HttpClient, private apisGeneralesService:ApisGeneralesService) { }
    requestOptions = { headers: this.apisGeneralesService.headers_post };

    getListarComunicado(){
        return this.http.get<Comunicado[]>(`${environment.baseUrl}comunicado`, this.requestOptions);
    }

    saveComunicado(json: JSON){
        return this.http.post(`${environment.baseUrl}comunicado`, json, this.requestOptions);
    }

    updateComunicado(comunicado_id: number, json: JSON){
        return this.http.patch(`${environment.baseUrl}comunicado/${comunicado_id}`, json, this.requestOptions);
    }

    deleteComunicado(comunicado_id: number){
        return this.http.delete(`${environment.baseUrl}comunicado/${comunicado_id}`, this.requestOptions);
    }
}
