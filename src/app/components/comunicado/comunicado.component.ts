import { Component, OnInit } from '@angular/core';
import { MessageService} from 'primeng/api';
import { ToolsService } from 'app/service/tools/tools.service';
import { SColonoService } from 'app/service/s-colono/s-colono.service';
import { STipoComunicadoService } from 'app/service/s-tipoComunicado/s-tipo-comunicado.service';
import { Comunicado } from 'app/api/Comunicado';
import { SComunicadoService } from 'app/service/s-comunicado/s-comunicado.service';

@Component({
  selector: 'app-comunicado',
  templateUrl: './comunicado.component.html',
  providers: [MessageService],
  styleUrls: ['./comunicado.component.scss']
})
export class ComunicadoComponent implements OnInit {

    comunicado: Comunicado;
    comunicados: Comunicado[];
    selectedComunicados: Comunicado[];
    /************* banderas *****************/
    banAddUp: boolean = false;
    submitted: boolean = false;
    saveError: boolean = false;
    /************* modales ***************** */
    dialogComunicado: boolean = false;
    dialogDeleteComunicado: boolean = false;
    /****************** fomulario folios ******************** */
    nombre: string;
    colono_id: number; colono_options: any[];
    tComunicado_id: number; tComunicado_options: any[];

    constructor(
        private messageService: MessageService,
        private sComunicadoService:SComunicadoService,
        private sTipoComunicadoService:STipoComunicadoService,
        private sColonoService:SColonoService,
        private toolsService:ToolsService,
    ) { }

    ngOnInit(): void {
        this.refreshTable();
        this.selectores();
    }

    refreshTable(){
        this.sComunicadoService.getListarComunicado().subscribe( (r) => this.comunicados = r);
    }

    selectores(){
        if(!this.tComunicado_options){
            this.sTipoComunicadoService.getListarTipoC().subscribe(r => this.tComunicado_options = r );
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

    dialogAddUpComuniado(comunicado: Comunicado, bandera: boolean){
        this.banAddUp = bandera;
        this.selectores();
        if(bandera){//update
            this.comunicado = {...comunicado};
            console.log(this.comunicado);
            this.colono_id = this.comunicado.colono_id;
            this.tComunicado_id = this.comunicado.tipo_comunicado_id;
            this.nombre = this.comunicado.name;
        }else{//create
            this.comunicado = {};
        }
        this.dialogComunicado = true;
    }

    dialogDelete(comunicado: Comunicado){
        this.comunicado = {...comunicado};
        this.dialogDeleteComunicado = true;
    }

    deleteComunicado(){
        this.sComunicadoService.deleteComunicado(this.comunicado.id).subscribe({
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

    saveDataComunicado(){
        this.submitted = true;
        if(this.tComunicado_id && this.colono_id && this.nombre  ){
            if(this.banAddUp){//update
                let json = {
                    colono_id: this.colono_id,
                    tipo_comunicado_id: this.tComunicado_id,
                    name: this.nombre,
                    foto_1: "",
                    foto_2: ""
                }
                this.sComunicadoService.updateComunicado(this.comunicado.id, JSON.parse(JSON.stringify(json))).subscribe({
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
                    tipo_comunicado_id: this.tComunicado_id,
                    name: this.nombre,
                    foto_1: "",
                    foto_2: ""
                }
                this.sComunicadoService.saveComunicado(JSON.parse(JSON.stringify(json))).subscribe({
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
        this.dialogComunicado = false;
        this.submitted = false;
        this.dialogDeleteComunicado = false;
        this.comunicado = {};
        //clear inputs form
        this.nombre = null;
        this.colono_id = null;
        this.tComunicado_id = null;
    }

}
