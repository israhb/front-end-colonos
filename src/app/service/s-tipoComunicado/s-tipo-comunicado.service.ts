import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { TipoComunicado } from 'app/api/TipoComunicado';
import { ApisGeneralesService } from '../generales/apis-generales.service';

@Injectable({
  providedIn: 'root'
})
export class STipoComunicadoService {

    constructor(private http: HttpClient, private apisGeneralesService:ApisGeneralesService) { }
    requestOptions = { headers: this.apisGeneralesService.headers_post };

    getListarTipoC(){
        return this.http.get<TipoComunicado[]>(`${environment.baseUrl}tipo-comunicado`, this.requestOptions);
    }

    saveTipoC(json: JSON){
        return this.http.post(`${environment.baseUrl}tipo-comunicado`, json, this.requestOptions);
    }

    updateTipoC(tipoComunicado_id: number, json: JSON){
        return this.http.patch(`${environment.baseUrl}tipo-comunicado/${tipoComunicado_id}`, json, this.requestOptions);
    }

    deleteTipoCS(tipoComunicado_id: number){
        return this.http.delete(`${environment.baseUrl}tipo-comunicado/${tipoComunicado_id}`, this.requestOptions);
    }
}
