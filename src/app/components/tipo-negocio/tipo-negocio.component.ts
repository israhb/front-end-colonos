import { Component, OnInit } from '@angular/core';
import { MessageService} from 'primeng/api';
import { ToolsService } from 'app/service/tools/tools.service';
import { TipoNegocio } from 'app/api/TipoNegocio';
import { STipoNegocioService } from 'app/service/s-tipoNegocio/s-tipo-negocio.service';

@Component({
  selector: 'app-tipo-negocio',
  templateUrl: './tipo-negocio.component.html',
  providers: [MessageService],
  styleUrls: ['./tipo-negocio.component.scss']
})
export class TipoNegocioComponent implements OnInit {

    tNegocio: TipoNegocio;
    tNegocios: TipoNegocio[];
    selectedTNegocios: TipoNegocio[];
    /************* banderas *****************/
    banAddUp: boolean = false;
    submitted: boolean = false;
    saveError: boolean = false;
    /************* modales ***************** */
    dialogTNegocio: boolean = false;
    dialogDeleteTNegocio: boolean = false;
    /****************** fomulario folios ******************** */
    nombre: string;

    constructor(
        private messageService: MessageService,
        private sTipoNegocioService:STipoNegocioService,
        private toolsService:ToolsService,
    ) { }

    ngOnInit(): void {
        this.refreshTable();
    }

    refreshTable(){
        this.sTipoNegocioService.getListarTipoN().subscribe( (r) => this.tNegocios = r);
    }

    dialogAddUpTNegocio(tNegocio: TipoNegocio, bandera: boolean){
        this.banAddUp = bandera;
        if(bandera){//update
            this.tNegocio = {...tNegocio};
            this.nombre = this.tNegocio.name;
        }else{//create
            this.tNegocio = {};
        }
        this.dialogTNegocio = true;
    }

    dialogDelete(tNegocio: TipoNegocio){
        this.tNegocio = {...tNegocio};
        this.dialogDeleteTNegocio = true;
    }

    deleteTNegocio(){
        this.sTipoNegocioService.deleteTipoNS(this.tNegocio.id).subscribe({
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

    saveDataTNegocio(){
        this.submitted = true;
        if( this.nombre ){
            if(this.banAddUp){//update
                let json = {
                    name: this.nombre
                }
                this.sTipoNegocioService.updateTipoN(this.tNegocio.id, JSON.parse(JSON.stringify(json))).subscribe({
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
                this.sTipoNegocioService.saveTipoN(JSON.parse(JSON.stringify(json))).subscribe({
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
        this.dialogTNegocio = false;
        this.submitted = false;
        this.dialogDeleteTNegocio = false;
        this.tNegocio = {};
        //clear inputs form
        this.nombre = null;
    }

}
