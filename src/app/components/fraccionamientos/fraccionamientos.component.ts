import { Component, OnInit } from '@angular/core';
import { Folios } from 'app/api/Folios';
import { MessageService} from 'primeng/api';
import { SEstadoService } from 'app/service/s-estado/s-estado.service';
import { SFraccionamientoService } from 'app/service/s-fraccionamiento/s-fraccionamiento.service';
import { ToolsService } from 'app/service/tools/tools.service';


@Component({
  selector: 'app-fraccionamientos',
  templateUrl: './fraccionamientos.component.html',
  providers: [MessageService],
  styleUrls: ['./fraccionamientos.component.scss']
})
export class FraccionamientosComponent implements OnInit {
    fraccionamiento: Folios;
    fraccionamientos: Folios[];
    selectedFraccionamientos: Folios[];
    /************* banderas *****************/
    banAddUp: boolean = false;
    submitted: boolean = false;
    saveError: boolean = false;
    /************* modales ***************** */
    dialogFrac: boolean = false;
    dialogDeleteFrac: boolean = false;
    /****************** fomulario folios ******************** */
    nombre: string;
    estado_id: number; estado_options: any[];

    constructor(
        private messageService: MessageService,
        private sEstadoService:SEstadoService,
        private sFraccionamientoService:SFraccionamientoService,
        private toolsService:ToolsService,
    ) { }

    ngOnInit(): void {
        this.refreshTable();
        this.selectores();
    }

    refreshTable(){
        this.sFraccionamientoService.getListarFraccionamientos().subscribe( (r) => this.fraccionamientos = r);
    }

    selectores(){
        if(!this.estado_options){
            this.sEstadoService.getListarEstados().subscribe(r => this.estado_options = r );
        }
    }

    dialogAddUpFrac(fraccionamiento: Folios, bandera: boolean){
        this.banAddUp = bandera;
        this.selectores();
        if(bandera){//update
            this.fraccionamiento = {...fraccionamiento};
            this.estado_id = this.fraccionamiento.estado_id;
            this.nombre = this.fraccionamiento.name;
        }else{//create
            this.fraccionamiento = {};
        }
        this.dialogFrac = true;
    }

    dialogDelete(fraccionamiento: Folios){
        this.fraccionamiento = {...fraccionamiento};
        this.dialogDeleteFrac = true;
    }

    deleteFrac(){
        this.sFraccionamientoService.deleteFraccionamientoS(this.fraccionamiento.id).subscribe({
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

    saveDataFolio(){
        this.submitted = true;
        if(this.estado_id && this.nombre ){
            if(this.banAddUp){//update
                let json = {
                    name: this.nombre,
                    estado_id: this.estado_id
                }
                this.sFraccionamientoService.updateFraccionamiento(this.fraccionamiento.id, JSON.parse(JSON.stringify(json))).subscribe({
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
                    estado_id: this.estado_id
                }
                this.sFraccionamientoService.saveFraccionamiento(JSON.parse(JSON.stringify(json))).subscribe({
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
        this.dialogFrac = false;
        this.submitted = false;
        this.dialogDeleteFrac = false;
        this.fraccionamiento = {};
        //clear inputs form
        this.nombre = null;
        this.estado_id = null;
    }

}
