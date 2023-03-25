import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Pago } from 'app/api/Pago';
import { ApisGeneralesService } from '../generales/apis-generales.service';

@Injectable({
  providedIn: 'root'
})
export class SPagoService {

    constructor(private http: HttpClient, private apisGeneralesService:ApisGeneralesService) { }
    requestOptions = { headers: this.apisGeneralesService.headers_post };

    getListarPago(){
        return this.http.get<Pago[]>(`${environment.baseUrl}pago`, this.requestOptions);
    }

    savePago(json: JSON){
        return this.http.post(`${environment.baseUrl}pago`, json, this.requestOptions);
    }

    updatePago(pago_id: number, json: JSON){
        return this.http.patch(`${environment.baseUrl}pago/${pago_id}`, json, this.requestOptions);
    }

    deletePago(pago_id: number){
        return this.http.delete(`${environment.baseUrl}pago/${pago_id}`, this.requestOptions);
    }
}
