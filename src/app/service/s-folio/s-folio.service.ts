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
}
