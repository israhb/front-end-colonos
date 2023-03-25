import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { TipoNegocio } from 'app/api/TipoNegocio';
import { ApisGeneralesService } from '../generales/apis-generales.service';

@Injectable({
  providedIn: 'root'
})
export class STipoNegocioService {

    constructor(private http: HttpClient, private apisGeneralesService:ApisGeneralesService) { }
    requestOptions = { headers: this.apisGeneralesService.headers_post };

    getListarTipoN(){
        return this.http.get<TipoNegocio[]>(`${environment.baseUrl}tipo-negocio`, this.requestOptions);
    }

    saveTipoN(json: JSON){
        return this.http.post(`${environment.baseUrl}tipo-negocio`, json, this.requestOptions);
    }

    updateTipoN(tipoNegocio_id: number, json: JSON){
        return this.http.patch(`${environment.baseUrl}tipo-negocio/${tipoNegocio_id}`, json, this.requestOptions);
    }

    deleteTipoNS(tipoNegocio_id: number){
        return this.http.delete(`${environment.baseUrl}tipo-negocio/${tipoNegocio_id}`, this.requestOptions);
    }
}
