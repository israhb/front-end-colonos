import { Component, OnInit } from '@angular/core';
import { MessageService} from 'primeng/api';
import { ToolsService } from 'app/service/tools/tools.service';
import { TipoServicio } from 'app/api/TipoServicio';
import { STipoServicioService } from 'app/service/s-tipoServicio/s-tipo-servicio.service';

@Component({
  selector: 'app-tipo-servicio',
  templateUrl: './tipo-servicio.component.html',
  providers: [MessageService],
  styleUrls: ['./tipo-servicio.component.scss']
})
export class TipoServicioComponent implements OnInit {

    tServicio: TipoServicio;
    tServicios: TipoServicio[];
    selectedTServicios: TipoServicio[];
    /************* banderas *****************/
    banAddUp: boolean = false;
    submitted: boolean = false;
    saveError: boolean = false;
    /************* modales ***************** */
    dialogTServicio: boolean = false;
    dialogDeleteTServicio: boolean = false;
    /****************** fomulario folios ******************** */
    nombre: string;

    constructor(
        private messageService: MessageService,
        private sTipoServicioService:STipoServicioService,
        private toolsService:ToolsService,
    ) { }

    ngOnInit(): void {
        this.refreshTable();
    }

    refreshTable(){
        this.sTipoServicioService.getListarTipoS().subscribe( (r) => this.tServicios = r);
    }

    dialogAddUpTServicio(tServicio: TipoServicio, bandera: boolean){
        this.banAddUp = bandera;
        if(bandera){//update
            this.tServicio = {...tServicio};
            this.nombre = this.tServicio.name;
        }else{//create
            this.tServicio = {};
        }
        this.dialogTServicio = true;
    }

    dialogDelete(tServicio: TipoServicio){
        this.tServicio = {...tServicio};
        this.dialogDeleteTServicio = true;
    }

    deleteTServicio(){
        this.sTipoServicioService.deleteTipoS(this.tServicio.id).subscribe({
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

    saveDataTSerivicio(){
        this.submitted = true;
        if( this.nombre ){
            if(this.banAddUp){//update
                let json = {
                    name: this.nombre
                }
                this.sTipoServicioService.updateTipoS(this.tServicio.id, JSON.parse(JSON.stringify(json))).subscribe({
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
                this.sTipoServicioService.saveTipoS(JSON.parse(JSON.stringify(json))).subscribe({
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
        this.dialogTServicio = false;
        this.submitted = false;
        this.dialogDeleteTServicio = false;
        this.tServicio = {};
        //clear inputs form
        this.nombre = null;
    }
}
