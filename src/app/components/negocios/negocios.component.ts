import { Component, OnInit } from '@angular/core';
import { MessageService} from 'primeng/api';
import { ToolsService } from 'app/service/tools/tools.service';
import { SColonoService } from 'app/service/s-colono/s-colono.service';
import { Negocio } from 'app/api/Negocio';
import { SNegocioService } from 'app/service/s-negocio/s-negocio.service';
import { STipoNegocioService } from 'app/service/s-tipoNegocio/s-tipo-negocio.service';

@Component({
  selector: 'app-negocios',
  templateUrl: './negocios.component.html',
  providers: [MessageService],
  styleUrls: ['./negocios.component.scss']
})
export class NegociosComponent implements OnInit {

    negocio: Negocio;
    negocios: Negocio[];
    selectedNegocios: Negocio[];
    /************* banderas *****************/
    banAddUp: boolean = false;
    submitted: boolean = false;
    saveError: boolean = false;
    /************* modales ***************** */
    dialogAddUPdate: boolean = false;
    dialogDeleteForm: boolean = false;
    /****************** fomulario folios ******************** */
    nombre_negocio: string;
    colono_id: number; colono_options: any[];
    tNegocio_id: number; tNegocioptions: any[];
    telefono_1: string;
    telefono_2: string;
    direccion: string;

    constructor(
        private messageService: MessageService,
        private sNegocioService:SNegocioService,
        private sTipoNegocioService:STipoNegocioService,
        private sColonoService:SColonoService,
        private toolsService:ToolsService,
    ) { }

    ngOnInit(): void {
        this.refreshTable();
        this.selectores();
    }

    refreshTable(){
        this.sNegocioService.getListarNegocios().subscribe( (r) => this.negocios = r);
    }

    selectores(){
        if(!this.tNegocioptions){
            this.sTipoNegocioService.getListarTipoN().subscribe(r => this.tNegocioptions = r );
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

    dialogAddUp(negocio: Negocio, bandera: boolean){
        this.banAddUp = bandera;
        this.selectores();
        if(bandera){//update
            this.negocio = {...negocio};
            console.log(this.negocio);
            this.tNegocio_id = this.negocio.tipo_negocio_id;
            this.colono_id = this.negocio.colono_id;
            this.nombre_negocio = this.negocio.name;
            this.direccion = this.negocio.direccion;
            this.telefono_1 = this.negocio.telefono_1;
            this.telefono_2 = this.negocio.telefono_2;
        }else{//create
            this.negocio = {};
        }
        this.dialogAddUPdate = true;
    }

    dialogDelete(negocio: Negocio){
        this.negocio = {...negocio};
        this.dialogDeleteForm = true;
    }

    deleteAction(){
        this.sNegocioService.deleteNegocio(this.negocio.id).subscribe({
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
        if(this.tNegocio_id && this.colono_id && this.nombre_negocio && this.telefono_1 && this.direccion ){
            this.telefono_1 = this.toolsService.cleanFormatPhone(this.telefono_1);
            this.telefono_2 = this.telefono_2 ? this.toolsService.cleanFormatPhone(this.telefono_2) : '';
            if(this.banAddUp){//update
                let json = {
                    tipo_negocio_id: this.tNegocio_id,
                    colono_id: this.colono_id,
                    name: this.nombre_negocio,
                    telefono_1: this.telefono_1,
                    telefono_2: this.telefono_2 ? this.telefono_2 : '',
                    foto_1: "",
                    foto_2: "",
                    foto_3: "",
                    foto_4: "",
                    direccion: this.direccion,
                    upload_date: this.toolsService.getDateNowAMD(),
                    upload_time: this.toolsService.getHourNow()
                }
                this.sNegocioService.updateNegocio(this.negocio.id, JSON.parse(JSON.stringify(json))).subscribe({
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
                    tipo_negocio_id: this.tNegocio_id,
                    colono_id: this.colono_id,
                    name: this.nombre_negocio,
                    telefono_1: this.telefono_1,
                    telefono_2: this.telefono_2 ? this.telefono_2 : '',
                    foto_1: "",
                    foto_2: "",
                    foto_3: "",
                    foto_4: "",
                    direccion: this.direccion,
                    upload_date: this.toolsService.getDateNowAMD(),
                    upload_time: this.toolsService.getHourNow()
                }
                this.sNegocioService.saveNegocio(JSON.parse(JSON.stringify(json))).subscribe({
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
        this.dialogAddUPdate = false;
        this.submitted = false;
        this.dialogDeleteForm = false;
        this.negocio = {};
        //clear inputs form
        this.nombre_negocio = null;
        this.telefono_1 = null;
        this.telefono_2 = null;
        this.colono_id = null;
        this.tNegocio_id = null;
        this.direccion = null;
    }

}
