import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Folios } from 'app/api/Folios';

@Injectable({
  providedIn: 'root'
})
export class SFolioService {

    constructor(private http: HttpClient) { }

    headers = new HttpHeaders({
        "Access-Control-Allow-Origin": "*"
    });
    headers_post = new HttpHeaders({
        "Access-Control-Allow-Origin": "*",
        'Content-type': 'application/json'
    });

    getListarFolios(){
        const requestOptions = { headers: this.headers_post };
        return this.http.get<Folios[]>(`${environment.baseUrl}folio`, requestOptions);
    }

    saveFolio(json: JSON){
        const requestOptions = { headers: this.headers_post };
        return this.http.post(`${environment.baseUrl}folio`, json, requestOptions);
    }

    updateFolio(folio_id: number, json: JSON){
        const requestOptions = { headers: this.headers_post };
        return this.http.patch(`${environment.baseUrl}folio/${folio_id}`, json, requestOptions);
    }

    deleteFolioS(folio_id: number){
        const requestOptions = { headers: this.headers_post };
        return this.http.delete(`${environment.baseUrl}folio/${folio_id}`, requestOptions);
    }
}
