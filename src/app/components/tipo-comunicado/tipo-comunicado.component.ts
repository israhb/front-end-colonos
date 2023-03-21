import { Component, OnInit } from '@angular/core';
import { MessageService} from 'primeng/api';
import { ToolsService } from 'app/service/tools/tools.service';
import { TipoComunicado } from 'app/api/TipoComunicado';
import { STipoComunicadoService } from 'app/service/s-tipoComunicado/s-tipo-comunicado.service';

@Component({
  selector: 'app-tipo-comunicado',
  templateUrl: './tipo-comunicado.component.html',
  providers: [MessageService],
  styleUrls: ['./tipo-comunicado.component.scss']
})
export class TipoComunicadoComponent implements OnInit {

    tComunicado: TipoComunicado;
    tComunicados: TipoComunicado[];
    selectedTComunicados: TipoComunicado[];
    /************* banderas *****************/
    banAddUp: boolean = false;
    submitted: boolean = false;
    saveError: boolean = false;
    /************* modales ***************** */
    dialogEstado: boolean = false;
    dialogDeleteEstado: boolean = false;
    /****************** fomulario folios ******************** */
    nombre: string;

    constructor(
        private messageService: MessageService,
        private sTipoComunicadoService:STipoComunicadoService,
        private toolsService:ToolsService,
    ) { }

    ngOnInit(): void {
        this.refreshTable();
    }

    refreshTable(){
        this.sTipoComunicadoService.getListarTipoC().subscribe( (r) => this.tComunicados = r);
    }

    dialogAddUpEstado(tComunicado: TipoComunicado, bandera: boolean){
        this.banAddUp = bandera;
        if(bandera){//update
            this.tComunicado = {...tComunicado};
            this.nombre = this.tComunicado.name;
        }else{//create
            this.tComunicado = {};
        }
        this.dialogEstado = true;
    }

    dialogDelete(tComunicado: TipoComunicado){
        this.tComunicado = {...tComunicado};
        this.dialogDeleteEstado = true;
    }

    deleteEstado(){
        this.sTipoComunicadoService.deleteTipoCS(this.tComunicado.id).subscribe({
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

    saveDataEstado(){
        this.submitted = true;
        if( this.nombre ){
            if(this.banAddUp){//update
                let json = {
                    name: this.nombre
                }
                this.sTipoComunicadoService.updateTipoC(this.tComunicado.id, JSON.parse(JSON.stringify(json))).subscribe({
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
                    name: this.nombre
                }
                this.sTipoComunicadoService.saveTipoC(JSON.parse(JSON.stringify(json))).subscribe({
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
        this.dialogEstado = false;
        this.submitted = false;
        this.dialogDeleteEstado = false;
        this.tComunicado = {};
        //clear inputs form
        this.nombre = null;
    }

}
