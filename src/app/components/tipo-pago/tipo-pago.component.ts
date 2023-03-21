import { Component, OnInit } from '@angular/core';
import { MessageService} from 'primeng/api';
import { ToolsService } from 'app/service/tools/tools.service';
import { TipoPago } from 'app/api/TipoPago';
import { STipoPagoService } from 'app/service/s-tipoPago/s-tipo-pago.service';

@Component({
  selector: 'app-tipo-pago',
  templateUrl: './tipo-pago.component.html',
  providers: [MessageService],
  styleUrls: ['./tipo-pago.component.scss']
})
export class TipoPagoComponent implements OnInit {

    tPago: TipoPago;
    tPagos: TipoPago[];
    selectedTPagos: TipoPago[];
    /************* banderas *****************/
    banAddUp: boolean = false;
    submitted: boolean = false;
    saveError: boolean = false;
    /************* modales ***************** */
    dialogTPago: boolean = false;
    dialogDeleteTPago: boolean = false;
    /****************** fomulario folios ******************** */
    nombre: string;

    constructor(
        private messageService: MessageService,
        private sTipoPagoService:STipoPagoService,
        private toolsService:ToolsService,
    ) { }

    ngOnInit(): void {
        this.refreshTable();
    }

    refreshTable(){
        this.sTipoPagoService.getListarTipoP().subscribe( (r) => this.tPagos = r);
    }

    dialogAddUpTPago(tPago: TipoPago, bandera: boolean){
        this.banAddUp = bandera;
        if(bandera){//update
            this.tPago = {...tPago};
            this.nombre = this.tPago.name;
        }else{//create
            this.tPago = {};
        }
        this.dialogTPago = true;
    }

    dialogDelete(tPago: TipoPago){
        this.tPago = {...tPago};
        this.dialogDeleteTPago = true;
    }

    deleteTPago(){
        this.sTipoPagoService.deleteTipoP(this.tPago.id).subscribe({
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

    saveDataTPago(){
        this.submitted = true;
        if( this.nombre ){
            if(this.banAddUp){//update
                let json = {
                    name: this.nombre
                }
                this.sTipoPagoService.updateTipoP(this.tPago.id, JSON.parse(JSON.stringify(json))).subscribe({
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
                this.sTipoPagoService.saveTipoP(JSON.parse(JSON.stringify(json))).subscribe({
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
        this.dialogTPago = false;
        this.submitted = false;
        this.dialogDeleteTPago = false;
        this.tPago = {};
        //clear inputs form
        this.nombre = null;
    }

}
