import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Colono } from 'app/api/Colono';
import { ApisGeneralesService } from '../generales/apis-generales.service';

@Injectable({
  providedIn: 'root'
})
export class SColonoService {

    constructor(private http: HttpClient, private apisGeneralesService:ApisGeneralesService) { }
    requestOptions = { headers: this.apisGeneralesService.headers_post };

    getListarColonos(){
        return this.http.get<Colono[]>(`${environment.baseUrl}colono`, this.requestOptions);
    }

    getListarNivelColono(){
        return this.http.get<Colono[]>(`${environment.baseUrl}colono/level-colono`, this.requestOptions);
    }

    saveColono(json: JSON){
        return this.http.post(`${environment.baseUrl}colono`, json, this.requestOptions);
    }

    updateColono(colono_id: number, json: JSON){
        return this.http.patch(`${environment.baseUrl}colono/${colono_id}`, json, this.requestOptions);
    }

    deleteColono(colono_id: number){
        return this.http.delete(`${environment.baseUrl}colono/${colono_id}`, this.requestOptions);
    }
}
