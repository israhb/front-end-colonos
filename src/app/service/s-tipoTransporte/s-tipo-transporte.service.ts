import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { TipoTransporte } from 'app/api/TipoTransporte';
import { ApisGeneralesService } from '../generales/apis-generales.service';

@Injectable({
  providedIn: 'root'
})
export class STipoTransporteService {

    constructor(private http: HttpClient, private apisGeneralesService:ApisGeneralesService) { }
    requestOptions = { headers: this.apisGeneralesService.headers_post };

    getListarTipoTransporte(){
        return this.http.get<TipoTransporte[]>(`${environment.baseUrl}tipo-transporte`, this.requestOptions);
    }

    saveTipoTransporte(json: JSON){
        return this.http.post(`${environment.baseUrl}tipo-transporte`, json, this.requestOptions);
    }

    updateTipoTransporte(tipoTransporte_id: number, json: JSON){
        return this.http.patch(`${environment.baseUrl}tipo-transporte/${tipoTransporte_id}`, json, this.requestOptions);
    }

    deleteTipoTransporte(tipoTransporte_id: number){
        return this.http.delete(`${environment.baseUrl}tipo-transporte/${tipoTransporte_id}`, this.requestOptions);
    }
}
