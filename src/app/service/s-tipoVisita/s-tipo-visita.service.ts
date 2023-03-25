import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { TipoVisita } from 'app/api/TipoVisita';
import { ApisGeneralesService } from '../generales/apis-generales.service';

@Injectable({
  providedIn: 'root'
})
export class STipoVisitaService {

    constructor(private http: HttpClient, private apisGeneralesService:ApisGeneralesService) { }
    requestOptions = { headers: this.apisGeneralesService.headers_post };

    getListarTipoVisita(){
        return this.http.get<TipoVisita[]>(`${environment.baseUrl}tipo-visita`, this.requestOptions);
    }

    saveTipoVisita(json: JSON){
        return this.http.post(`${environment.baseUrl}tipo-visita`, json, this.requestOptions);
    }

    updateTipoVisita(tipoVisita_id: number, json: JSON){
        return this.http.patch(`${environment.baseUrl}tipo-visita/${tipoVisita_id}`, json, this.requestOptions);
    }

    deleteTipoVisita(tipoVisita_id: number){
        return this.http.delete(`${environment.baseUrl}tipo-visita/${tipoVisita_id}`, this.requestOptions);
    }
}
