import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Fraccionamiento } from 'app/api/Fraccionamiento';
import { ApisGeneralesService } from '../generales/apis-generales.service';

@Injectable({
  providedIn: 'root'
})
export class SFraccionamientoService {

    constructor(private http: HttpClient, private apisGeneralesService:ApisGeneralesService) { }
    requestOptions = { headers: this.apisGeneralesService.headers_post };

    getListarFraccionamientos(){
        return this.http.get<Fraccionamiento[]>(`${environment.baseUrl}fraccionamiento`, this.requestOptions);
    }

    getLsitadoFraccByIdstado(estado_id: number){
        return this.http.get<Fraccionamiento[]>(`${environment.baseUrl}fraccionamiento/forEstadoId/${estado_id}`, this.requestOptions);
    }

    saveFraccionamiento(json: JSON){
        return this.http.post(`${environment.baseUrl}fraccionamiento`, json, this.requestOptions);
    }

    updateFraccionamiento(frac_id: number, json: JSON){
        return this.http.patch(`${environment.baseUrl}fraccionamiento/${frac_id}`, json, this.requestOptions);
    }

    deleteFraccionamientoS(frac_id: number){
        return this.http.delete(`${environment.baseUrl}fraccionamiento/${frac_id}`, this.requestOptions);
    }
}
