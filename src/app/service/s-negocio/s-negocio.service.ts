import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Negocio } from 'app/api/Negocio';
import { ApisGeneralesService } from '../generales/apis-generales.service';

@Injectable({
  providedIn: 'root'
})
export class SNegocioService {

    constructor(private http: HttpClient, private apisGeneralesService:ApisGeneralesService) { }
    requestOptions = { headers: this.apisGeneralesService.headers_post };

    getListarNegocios(){
        return this.http.get<Negocio[]>(`${environment.baseUrl}negocio`, this.requestOptions);
    }

    saveNegocio(json: JSON){
        return this.http.post(`${environment.baseUrl}negocio`, json, this.requestOptions);
    }

    updateNegocio(negocio_id: number, json: JSON){
        return this.http.patch(`${environment.baseUrl}negocio/${negocio_id}`, json, this.requestOptions);
    }

    deleteNegocio(negocio_id: number){
        return this.http.delete(`${environment.baseUrl}negocio/${negocio_id}`, this.requestOptions);
    }
}
