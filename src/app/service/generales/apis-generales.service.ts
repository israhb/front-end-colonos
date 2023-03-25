import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApisGeneralesService {

    constructor(private http: HttpClient) { }

    headers_post = new HttpHeaders({
        "Access-Control-Allow-Origin": "*",
        'Content-type': 'application/json'
      });

    /********* USUARIOS ************** */
    loginCredentials(json: JSON){
        const requestOptions = { headers: this.headers_post };
        return this.http.post(`${environment.baseUrl}colono/loginColono`, json, requestOptions);
    }
    /********* COMAPAÑA ************** */
    postListarCampanias(json: JSON){
        return this.http.post( environment.baseUrl+'ccListarCampanias', json, {});
    }
    /********* COMAPAÑA ************** */


}
