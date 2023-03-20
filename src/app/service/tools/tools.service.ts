import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToolsService {

    constructor() { }
    user_perfil: any[];
    user_permisions: any[];
    //funcion para generar numeros consecutivos en una tabla
    getGenerateNumeracionTables(json: any) {
        let count = 1;
        let jsonFinal = new Array();
        for (let index = 0; index < json.length; index++) {
            const element = json[index];
            element['numeracion'] = count;
            jsonFinal.push(element);
            count++;
        }
        return jsonFinal;
    }
    //regresa fecha actual formato yyyy-mm-dd
    getDateNowAMD(){
        var u = new Date();
        return `${u.getUTCFullYear()}-${('0'+(u.getUTCMonth()+1)).slice(-2)}-${('0'+u.getUTCDate()).slice(-2)}`;
    }
    //regresa hora actual formato HH:mm:00
    getHourNow(){
        var u = new Date();
        let minutes = u.getMinutes() < 10 ? '0'+u.getMinutes() : u.getMinutes();
        let hours = u.getHours() < 10 ? '0'+u.getHours() : u.getHours();
        return `${hours}:${minutes}:00`;
    }
}
