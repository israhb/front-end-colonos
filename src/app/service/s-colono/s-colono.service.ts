import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Colono } from 'app/api/Colono';

@Injectable({
  providedIn: 'root'
})
export class SColonoService {

    constructor(private http: HttpClient) { }

    headers = new HttpHeaders({
        "Access-Control-Allow-Origin": "*"
    });
    headers_post = new HttpHeaders({
        "Access-Control-Allow-Origin": "*",
        'Content-type': 'application/json'
    });

    getListarColonos(){
        const requestOptions = { headers: this.headers_post };
        return this.http.get<Colono[]>(`${environment.baseUrl}colono`, requestOptions);
    }

    getListarNivelColono(){
        const requestOptions = { headers: this.headers_post };
        return this.http.get<Colono[]>(`${environment.baseUrl}colono/level-colono`, requestOptions);
    }

    saveColono(json: JSON){
        const requestOptions = { headers: this.headers_post };
        return this.http.post(`${environment.baseUrl}colono`, json, requestOptions);
    }

    updateColono(colono_id: number, json: JSON){
        const requestOptions = { headers: this.headers_post };
        return this.http.patch(`${environment.baseUrl}colono/${colono_id}`, json, requestOptions);
    }

    deleteColono(colono_id: number){
        const requestOptions = { headers: this.headers_post };
        return this.http.delete(`${environment.baseUrl}colono/${colono_id}`, requestOptions);
    }
}
