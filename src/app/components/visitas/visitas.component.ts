import { Component, OnInit } from '@angular/core';
import { MessageService} from 'primeng/api';
import { ToolsService } from 'app/service/tools/tools.service';
import { SColonoService } from 'app/service/s-colono/s-colono.service';
import { SVisitasService } from 'app/service/s-visitas/s-visitas.service';
import { STipoVisitaService } from 'app/service/s-tipoVisita/s-tipo-visita.service';
import { STipoServicioService } from 'app/service/s-tipoServicio/s-tipo-servicio.service';
import { STipoTransporteService } from 'app/service/s-tipoTransporte/s-tipo-transporte.service';
import { Visitas } from 'app/api/Visitas';

@Component({
  selector: 'app-visitas',
  templateUrl: './visitas.component.html',
  providers: [MessageService],
  styleUrls: ['./visitas.component.scss']
})
export class VisitasComponent implements OnInit {

    visita: Visitas;
    visitas: Visitas[];
    selectedVisitas: Visitas[];
    /************* banderas *****************/
    banAddUp: boolean = false;
    submitted: boolean = false;
    saveError: boolean = false;
    /************* modales ***************** */
    dialogVisita: boolean = false;
    dialogDeleteVisita: boolean = false;
    /****************** fomulario folios ******************** */
    nombre: string;
    colono_id: number; colono_options: any[];
    tVisita_id: number; tVisita_options: any[];
    tServicio_id: number; tServicio_options: any[];
    tTransporte_id: number; tTransporte_options: any[];
    fecha_visita: string;
    n_acom: number;
    evento: boolean;
    placas: string;
    comentario: string;

    constructor(
        private messageService: MessageService,
        private sVisitasService:SVisitasService,
        private sColonoService:SColonoService,
        private toolsService:ToolsService,
        private sTipoVisitaService:STipoVisitaService,
        private sTipoServicioService:STipoServicioService,
        private sTipoTransporteService:STipoTransporteService
    ) { }

    ngOnInit(): void {
        this.refreshTable();
        this.selectores();
    }

    refreshTable(){
        this.sVisitasService.getListarVisita().subscribe( (r) => this.visitas = r);
    }

    selectores(){
        if(!this.tVisita_options){
            this.sTipoVisitaService.getListarTipoVisita().subscribe(r => this.tVisita_options = r );
        }
        if(!this.tServicio_options){
            this.sTipoServicioService.getListarTipoS().subscribe(r => this.tServicio_options = r );
        }
        if(!this.tTransporte_options){
            this.sTipoTransporteService.getListarTipoTransporte().subscribe(r => this.tTransporte_options = r );
        }
        if(!this.colono_options){
            this.sColonoService.getListarNivelColono().subscribe({
                next: (v) =>{
                    if(v != null ){

                        let json = new Array();
                        for (let index = 0; index < v.length; index++) {
                            const element = v[index];
                            element.nombre = `${element.nombre} ${element.apellido_paterno} ${element.apellido_materno}`;
                            json.push(element);
                        }
                        this.colono_options = json;
                    }
                },
                error: (e) =>{
                    console.error(e);
                },
                complete: () => console.info('complete')
            });
            //.subscribe(r => this.colono_options = r );
        }
    }

    dialogAddUpVisita(visita: Visitas, bandera: boolean){
        this.banAddUp = bandera;
        this.selectores();
        if(bandera){//update
            this.visita = {...visita};
            console.log(this.visita);
            this.colono_id = this.visita.colono_id;
            this.tVisita_id = this.visita.tipo_visita_id;
            this.tServicio_id = this.visita.tipo_servicio_id;
            this.tTransporte_id = this.visita.tipo_transporte_id;
            this.nombre = this.visita.name;
            this.fecha_visita = `${this.visita.visita_date} ${this.visita.visita_time.slice(0, -3)}`;
            this.n_acom = this.visita.numero_acom;
            this.evento = this.visita.evento == 0 ? false : true;
            this.placas = this.visita.placas;
            this.comentario = this.visita.nota;
        }else{//create
            this.visita = {};
        }
        this.dialogVisita = true;
    }

    dialogDelete(visita: Visitas){
        this.visita = {...visita};
        this.dialogDeleteVisita = true;
    }

    deleteVisita(){
        this.sVisitasService.deleteVisita(this.visita.id).subscribe({
            next: (v) =>{
                if(v != null ){
                    this.messageService.add({severity: 'success', summary: 'Completado', detail: 'Eliminado Exitosamente!', life: 5000});
                    this.clearAndClouse();
                    this.refreshTable();
                }
            },
            error: (e) =>{
                console.error(e);
            },
            complete: () => console.info('complete')
        });
    }

    saveData(){
        this.submitted = true;
        if(this.colono_id && this.tVisita_id && this.tServicio_id && this.tTransporte_id && this.nombre && this.fecha_visita ){
            this.fecha_visita = this.fecha_visita.length <= 16 ? `${this.fecha_visita}:00` : this.toolsService.formatDateHourMinuteSeconds(this.fecha_visita,false, false);
            let divFecha = this.fecha_visita.split(' ');
            if(this.banAddUp){//update
                let json = {
                    colono_id: this.colono_id,
                    tipo_visita_id: this.tVisita_id,
                    tipo_servicio_id: this.tServicio_id,
                    tipo_transporte_id: this.tTransporte_id,
                    name: this.nombre,
                    visita_date: divFecha[0],
                    visita_time: divFecha[1],
                    numero_acom: this.n_acom ? this.n_acom : 0,
                    evento: this.evento ? 1 : 0,
                    placas: this.placas ? this.placas : '',
                    nota: this.comentario,
                    gps: "gps m",
                    hash: null,
                    upload_date: this.toolsService.getDateNowAMD(),
                    upload_time: this.toolsService.getHourNow()
                }
                this.sVisitasService.updateVisita(this.visita.id, JSON.parse(JSON.stringify(json))).subscribe({
                    next: (v) =>{
                        if(v != null ){
                            this.messageService.add({severity: 'success', summary: 'Completado', detail: 'Guardado Exitosamente!', life: 5000});
                            this.clearAndClouse();
                            this.refreshTable();
                        }else{
                            this.saveError = true;
                        }
                    },
                    error: (e) =>{
                        this.saveError = true;
                        console.error(e);
                    },
                    complete: () => console.info('complete')
                });
            }else{//create
                let json = {
                    colono_id: this.colono_id,
                    tipo_visita_id: this.tVisita_id,
                    tipo_servicio_id: this.tServicio_id,
                    tipo_transporte_id: this.tTransporte_id,
                    name: this.nombre,
                    visita_date: divFecha[0],
                    visita_time: divFecha[1],
                    numero_acom: this.n_acom ? this.n_acom : 0,
                    evento: this.evento ? 1 : 0,
                    placas: this.placas ? this.placas : '',
                    nota: this.comentario,
                    gps: "gps",
                    hash: null,
                    upload_date: this.toolsService.getDateNowAMD(),
                    upload_time: this.toolsService.getHourNow()
                }
                this.sVisitasService.saveVisita(JSON.parse(JSON.stringify(json))).subscribe({
                    next: (v) =>{
                        if(v != null ){
                            this.messageService.add({severity: 'success', summary: 'Completado', detail: 'Guardado Exitosamente!', life: 5000});
                            this.clearAndClouse();
                            this.refreshTable();
                        }else{
                            this.saveError = true;
                        }
                    },
                    error: (e) =>{
                        this.saveError = true;
                        console.error(e);
                    },
                    complete: () => console.info('complete')
                });
            }
        }
    }

    clearAndClouse(){
        this.dialogVisita = false;
        this.submitted = false;
        this.dialogDeleteVisita = false;
        this.visita = {};
        //clear inputs form
        this.colono_id = null;
        this.tVisita_id = null;
        this.tServicio_id = null;
        this.tTransporte_id = null;
        this.nombre = null;
        this.fecha_visita = null;
        this.n_acom = null;
        this.evento = null;
        this.placas = null;
        this.comentario = null;
    }

}
