import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Folios } from 'app/api/Folios';
import { ApisGeneralesService } from '../generales/apis-generales.service';

@Injectable({
  providedIn: 'root'
})
export class SFolioService {

    constructor(private http: HttpClient, private apisGeneralesService:ApisGeneralesService) { }
    requestOptions = { headers: this.apisGeneralesService.headers_post };

    getListarFolios(){
        return this.http.get<Folios[]>(`${environment.baseUrl}folio`, this.requestOptions);
    }

    saveFolio(json: JSON){
        return this.http.post(`${environment.baseUrl}folio`, json, this.requestOptions);
    }

    updateFolio(folio_id: number, json: JSON){
        return this.http.patch(`${environment.baseUrl}folio/${folio_id}`, json, this.requestOptions);
    }

    deleteFolioS(folio_id: number){
        return this.http.delete(`${environment.baseUrl}folio/${folio_id}`, this.requestOptions);
    }
}
