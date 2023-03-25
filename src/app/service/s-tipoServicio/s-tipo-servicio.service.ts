import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { TipoServicio } from 'app/api/TipoServicio';
import { ApisGeneralesService } from '../generales/apis-generales.service';

@Injectable({
  providedIn: 'root'
})
export class STipoServicioService {

    constructor(private http: HttpClient, private apisGeneralesService:ApisGeneralesService) { }
    requestOptions = { headers: this.apisGeneralesService.headers_post };

    getListarTipoS(){
        return this.http.get<TipoServicio[]>(`${environment.baseUrl}tipo-servicio`, this.requestOptions);
    }

    saveTipoS(json: JSON){
        return this.http.post(`${environment.baseUrl}tipo-servicio`, json, this.requestOptions);
    }

    updateTipoS(tipoServicio_id: number, json: JSON){
        return this.http.patch(`${environment.baseUrl}tipo-servicio/${tipoServicio_id}`, json, this.requestOptions);
    }

    deleteTipoS(tipoServicio_id: number){
        return this.http.delete(`${environment.baseUrl}tipo-servicio/${tipoServicio_id}`, this.requestOptions);
    }
}
