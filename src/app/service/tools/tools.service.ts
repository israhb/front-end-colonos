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
    //funcion para acomodar formato de fechas
    formatDateInputs(dates: string, banderaCreateUpdate: boolean, modDayMonYear: boolean){
        if(!dates){
            return dates;
        }else{
            if (banderaCreateUpdate) {
                let dividir_fecha = dates.split("-");
                return dates = `${dividir_fecha[2]}-${dividir_fecha[1]}-${dividir_fecha[0]}`;
            } else {
                if (modDayMonYear) {//12-12-2022
                    var u = new Date(Date.parse(dates));
                    return `${('0'+u.getUTCDate()).slice(-2)}-${('0'+(u.getUTCMonth()+1) ).slice(-2)}-${u.getUTCFullYear()}`;
                } else {//2022-12-12
                    var u = new Date(Date.parse(dates));
                    return `${u.getUTCFullYear()}-${('0'+(u.getUTCMonth()+1)).slice(-2)}-${('0'+u.getUTCDate()).slice(-2)}`;
                }
            }
        }
    }
    //funcion para acomodar formato de fechas con hora minuto
    formatDateHourMinuteSeconds(dates: string, banderaCreateUpdate: boolean, modDayMonYear: boolean){
        if(!dates){
            return dates;
        }else{
            if (banderaCreateUpdate) {
                let dividir_fecha = dates.split("-");
                let hour = dividir_fecha[2].split(" ")
                let minute = hour[1].split(":");
                let mnute2 = minute[1].length == 1 ? '0'+minute[1] : minute[1];
                return `${hour[0]}-${dividir_fecha[1]}-${dividir_fecha[0]} ${minute[0]}:${mnute2}:00`;
            } else {
                if (modDayMonYear) {//2022-12-12 05:10:00
                    let dividir_fecha = dates.split("-");
                    let hour = dividir_fecha[2].split(" ")
                    let minute = hour[1].split(":");
                    let mnute2 = minute[1].length == 1 ? '0'+minute[1] : minute[1];
                    return `${dividir_fecha[0]}-${dividir_fecha[1]}-${hour[0]} ${minute[0]}:${mnute2}`;
                } else {//2022-12-12 05:10:00
                    var u = new Date(Date.parse(dates));
                    let minutes = u.getMinutes() < 10 ? '0'+u.getMinutes() : u.getMinutes();
                    let hours = u.getHours() < 10 ? '0'+u.getHours() : u.getHours();
                    return `${u.getUTCFullYear()}-${('0'+(u.getUTCMonth()+1)).slice(-2)}-${('0'+u.getUTCDate()).slice(-2)} ${hours}:${minutes}:00`;
                }
            }
        }
    }
    cleanFormatPhone(phone: string){
        if(phone != '' && phone != undefined){
          phone = phone.split(" ").join("");
          phone = phone.replace("-","");
          phone = phone.replace(")","");
          phone = phone.replace("(","");
          phone = phone.split(" ").join("");
          return phone;
        }else{
          return phone;
        }
    }
}
