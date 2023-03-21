import { Component, OnInit } from '@angular/core';
import { MessageService} from 'primeng/api';
import { SEstadoService } from 'app/service/s-estado/s-estado.service';
import { ToolsService } from 'app/service/tools/tools.service';
import { Estado } from 'app/api/Folios';

@Component({
  selector: 'app-estados',
  templateUrl: './estados.component.html',
  providers: [MessageService],
  styleUrls: ['./estados.component.scss']
})
export class EstadosComponent implements OnInit {

    estado: Estado;
    estados: Estado[];
    selectedEstados: Estado[];
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
        private sEstadoService:SEstadoService,
        private toolsService:ToolsService,
    ) { }

    ngOnInit(): void {
        this.refreshTable();
    }

    refreshTable(){
        this.sEstadoService.getListarEstados().subscribe( (r) => this.estados = r);
    }

    dialogAddUpEstado(estado: Estado, bandera: boolean){
        this.banAddUp = bandera;
        if(bandera){//update
            this.estado = {...estado};
            this.nombre = this.estado.name;
        }else{//create
            this.estado = {};
        }
        this.dialogEstado = true;
    }

    dialogDelete(estado: Estado){
        this.estado = {...estado};
        this.dialogDeleteEstado = true;
    }

    deleteEstado(){
        this.sEstadoService.deleteEstadoS(this.estado.id).subscribe({
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
                this.sEstadoService.updateEstado(this.estado.id, JSON.parse(JSON.stringify(json))).subscribe({
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
                this.sEstadoService.saveEstado(JSON.parse(JSON.stringify(json))).subscribe({
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
        this.estado = {};
        //clear inputs form
        this.nombre = null;
    }

}
