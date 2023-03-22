import { Component, OnInit } from '@angular/core';
import { MessageService} from 'primeng/api';
import { ToolsService } from 'app/service/tools/tools.service';
import { TipoTransporte } from 'app/api/TipoTransporte';
import { STipoTransporteService } from 'app/service/s-tipoTransporte/s-tipo-transporte.service';

@Component({
  selector: 'app-tipo-transporte',
  templateUrl: './tipo-transporte.component.html',
  providers: [MessageService],
  styleUrls: ['./tipo-transporte.component.scss']
})
export class TipoTransporteComponent implements OnInit {


    tTransporte: TipoTransporte;
    tTransportes: TipoTransporte[];
    selectedTTransportes: TipoTransporte[];
    /************* banderas *****************/
    banAddUp: boolean = false;
    submitted: boolean = false;
    saveError: boolean = false;
    /************* modales ***************** */
    dialogTTransporte: boolean = false;
    dialogDeleteTTransporte: boolean = false;
    /****************** fomulario folios ******************** */
    nombre: string;

    constructor(
        private messageService: MessageService,
        private sTipoTransporteService:STipoTransporteService,
        private toolsService:ToolsService,
    ) { }

    ngOnInit(): void {
        this.refreshTable();
    }

    refreshTable(){
        this.sTipoTransporteService.getListarTipoTransporte().subscribe( (r) => this.tTransportes = r);
    }

    dialogAddUpTTransporte(tTransporte: TipoTransporte, bandera: boolean){
        this.banAddUp = bandera;
        if(bandera){//update
            this.tTransporte = {...tTransporte};
            this.nombre = this.tTransporte.name;
        }else{//create
            this.tTransporte = {};
        }
        this.dialogTTransporte = true;
    }

    dialogDelete(tTransporte: TipoTransporte){
        this.tTransporte = {...tTransporte};
        this.dialogDeleteTTransporte = true;
    }

    deleteTTransporte(){
        this.sTipoTransporteService.deleteTipoTransporte(this.tTransporte.id).subscribe({
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

    saveDataTTransporte(){
        this.submitted = true;
        if( this.nombre ){
            if(this.banAddUp){//update
                let json = {
                    name: this.nombre
                }
                this.sTipoTransporteService.updateTipoTransporte(this.tTransporte.id, JSON.parse(JSON.stringify(json))).subscribe({
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
                this.sTipoTransporteService.saveTipoTransporte(JSON.parse(JSON.stringify(json))).subscribe({
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
        this.dialogTTransporte = false;
        this.submitted = false;
        this.dialogDeleteTTransporte = false;
        this.tTransporte = {};
        //clear inputs form
        this.nombre = null;
    }

}
