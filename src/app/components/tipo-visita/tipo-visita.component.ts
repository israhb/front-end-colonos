import { Component, OnInit } from '@angular/core';
import { MessageService} from 'primeng/api';
import { ToolsService } from 'app/service/tools/tools.service';
import { TipoVisita } from 'app/api/TipoVisita';
import { STipoVisitaService } from 'app/service/s-tipoVisita/s-tipo-visita.service';

@Component({
  selector: 'app-tipo-visita',
  templateUrl: './tipo-visita.component.html',
  providers: [MessageService],
  styleUrls: ['./tipo-visita.component.scss']
})
export class TipoVisitaComponent implements OnInit {

    tVisita: TipoVisita;
    tVisitas: TipoVisita[];
    selectedTVisitas: TipoVisita[];
    /************* banderas *****************/
    banAddUp: boolean = false;
    submitted: boolean = false;
    saveError: boolean = false;
    /************* modales ***************** */
    dialogTVisita: boolean = false;
    dialogDeleteTVisita: boolean = false;
    /****************** fomulario folios ******************** */
    nombre: string;

    constructor(
        private messageService: MessageService,
        private sTipoVisitaService:STipoVisitaService,
        private toolsService:ToolsService,
    ) { }

    ngOnInit(): void {
        this.refreshTable();
    }

    refreshTable(){
        this.sTipoVisitaService.getListarTipoVisita().subscribe( (r) => this.tVisitas = r);
    }

    dialogAddUpTVisita(tVisita: TipoVisita, bandera: boolean){
        this.banAddUp = bandera;
        if(bandera){//update
            this.tVisita = {...tVisita};
            this.nombre = this.tVisita.name;
        }else{//create
            this.tVisita = {};
        }
        this.dialogTVisita = true;
    }

    dialogDelete(tVisita: TipoVisita){
        this.tVisita = {...tVisita};
        this.dialogDeleteTVisita = true;
    }

    deleteTVisita(){
        this.sTipoVisitaService.deleteTipoVisita(this.tVisita.id).subscribe({
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

    saveDataTVisita(){
        this.submitted = true;
        if( this.nombre ){
            if(this.banAddUp){//update
                let json = {
                    name: this.nombre
                }
                this.sTipoVisitaService.updateTipoVisita(this.tVisita.id, JSON.parse(JSON.stringify(json))).subscribe({
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
                this.sTipoVisitaService.saveTipoVisita(JSON.parse(JSON.stringify(json))).subscribe({
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
        this.dialogTVisita = false;
        this.submitted = false;
        this.dialogDeleteTVisita = false;
        this.tVisita = {};
        //clear inputs form
        this.nombre = null;
    }

}
