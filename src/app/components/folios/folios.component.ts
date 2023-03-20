import { Component, OnInit } from '@angular/core';
import { Folios } from 'app/api/Folios';
import { MessageService} from 'primeng/api';
import { SFolioService } from 'app/service/s-folio/s-folio.service';
import { SEstadoService } from 'app/service/s-estado/s-estado.service';
import { SFraccionamientoService } from 'app/service/s-fraccionamiento/s-fraccionamiento.service';
import { ToolsService } from 'app/service/tools/tools.service';

@Component({
  selector: 'app-folios',
  templateUrl: './folios.component.html',
  providers: [MessageService],
  styleUrls: ['./folios.component.scss']
})
export class FoliosComponent implements OnInit {

    folio: Folios;
    folios: Folios[];
    selectedFolios: Folios[];
    /************* banderas *****************/
    banAddUp: boolean = false;
    submitted: boolean = false;
    saveError: boolean = false;
    /************* modales ***************** */
    dialogFolio: boolean = false;
    dialogDeleteFolio: boolean = false;
    /****************** fomulario folios ******************** */
    nombre: string;
    mac: string;
    fraccionamiento_id: number; fraccionamiento_options: any[];
    estado_id: number; estado_options: any[];

    constructor(
        private messageService: MessageService,
        private sFolioService:SFolioService,
        private sEstadoService:SEstadoService,
        private sFraccionamientoService:SFraccionamientoService,
        private toolsService:ToolsService,
    ) { }

    ngOnInit(): void {
        this.refreshTable();
        this.selectores();
    }

    refreshTable(){
        this.sFolioService.getListarFolios().subscribe( (r) => this.folios = r);
    }

    selectores(){
        if(!this.estado_options){
            this.sEstadoService.getListarEstados().subscribe(r => this.estado_options = r );
        }
    }

    dialogAddUpFolio(folio: Folios, bandera: boolean){
        this.banAddUp = bandera;
        this.selectores();
        if(bandera){//update
            this.folio = {...folio};
            this.selectEstado(this.folio.estado_id);
            this.estado_id = this.folio.estado_id;
            this.fraccionamiento_id = this.folio.frac_id;
            this.nombre = this.folio.name;
            this.mac = this.folio.mac;
        }else{//create
            this.folio = {};
        }
        this.dialogFolio = true;
    }

    dialogDelete(folio: Folios){
        if(folio.nuevo == 1){
            this.messageService.add({severity: 'error', summary: 'Error', detail: 'No se puede Eliminar Folio, ya tiene Relacion con Colono', life: 5000});
        }else{
            this.folio = {...folio};
            this.dialogDeleteFolio = true;
        }
    }

    deleteFolio(){
        this.sFolioService.deleteFolioS(this.folio.id).subscribe({
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

    selectEstado(estado_id: number){
        this.sFraccionamientoService.getLsitadoFraccByIdstado(estado_id).subscribe(r => this.fraccionamiento_options = r );
    }

    saveDataFolio(){
        this.submitted = true;
        if(this.estado_id && this.fraccionamiento_id && this.nombre ){
            if(this.banAddUp){//update
                let json = {
                    name: this.nombre,
                    mac: this.mac ? this.mac : "",
                    nuevo: this.folio.nuevo,
                    upload_date: this.toolsService.getDateNowAMD(),
                    upload_time: this.toolsService.getHourNow(),
                    estado_id: this.estado_id,
                    frac_id: this.fraccionamiento_id
                }
                this.sFolioService.updateFolio(this.folio.id, JSON.parse(JSON.stringify(json))).subscribe({
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
                    name: this.nombre,
                    mac: this.mac ? this.mac : "",
                    nuevo: "0",
                    upload_date: this.toolsService.getDateNowAMD(),
                    upload_time: this.toolsService.getHourNow(),
                    estado_id: this.estado_id,
                    frac_id: this.fraccionamiento_id
                }
                this.sFolioService.saveFolio(JSON.parse(JSON.stringify(json))).subscribe({
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
        this.dialogFolio = false;
        this.submitted = false;
        this.dialogDeleteFolio = false;
        this.folio = {};
        //clear inputs form
        this.nombre = null;
        this.mac = null;
        this.fraccionamiento_id = null;
        this.estado_id = null;
    }
}
