import { Component, OnInit } from '@angular/core';
import { MessageService} from 'primeng/api';
import { ToolsService } from 'app/service/tools/tools.service';
import { Pago } from 'app/api/Pago';
import { SPagoService } from 'app/service/s-pago/s-pago.service';
import { SColonoService } from 'app/service/s-colono/s-colono.service';
import { STipoPagoService } from 'app/service/s-tipoPago/s-tipo-pago.service';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  providers: [MessageService],
  styleUrls: ['./pago.component.scss']
})
export class PagoComponent implements OnInit {

    pago: Pago;
    pagos: Pago[];
    selectedPagos: Pago[];
    /************* banderas *****************/
    banAddUp: boolean = false;
    submitted: boolean = false;
    saveError: boolean = false;
    /************* modales ***************** */
    dialogPago: boolean = false;
    dialogDeletePago: boolean = false;
    /****************** fomulario folios ******************** */
    nombre: string;
    monto: number;
    colono_id: number; colono_options: any[];
    tPago_id: number; tPago_options: any[];
    fecha: string;

    constructor(
        private messageService: MessageService,
        private sPagoService:SPagoService,
        private sTipoPagoService:STipoPagoService,
        private sColonoService:SColonoService,
        private toolsService:ToolsService,
    ) { }

    ngOnInit(): void {
        this.refreshTable();
        this.selectores();
    }

    refreshTable(){
        this.sPagoService.getListarPago().subscribe( (r) => this.pagos = r);
    }

    selectores(){
        if(!this.tPago_options){
            this.sTipoPagoService.getListarTipoP().subscribe(r => this.tPago_options = r );
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

    dialogAddUpPago(pago: Pago, bandera: boolean){
        this.banAddUp = bandera;
        this.selectores();
        if(bandera){//update
            this.pago = {...pago};
            console.log(this.pago);
            this.colono_id = this.pago.colono_id;
            this.tPago_id = this.pago.tipo_pago_id;
            this.nombre = this.pago.name;
            this.monto = this.pago.monto;
            this.fecha = this.pago.upload_date;
        }else{//create
            this.pago = {};
        }
        this.dialogPago = true;
    }

    dialogDelete(pago: Pago){
        this.pago = {...pago};
        this.dialogDeletePago = true;
    }

    deletePago(){
        this.sPagoService.deletePago(this.pago.id).subscribe({
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

    saveDataPago(){
        this.submitted = true;
        this.fecha = this.fecha.length <= 10 ? this.fecha : this.toolsService.formatDateInputs(this.fecha,false, false);
        if(this.tPago_id && this.colono_id && this.nombre && this.monto && this.fecha ){
            if(this.banAddUp){//update
                let json = {
                    colono_id: this.colono_id,
                    tipo_pago_id: this.tPago_id,
                    name: this.nombre,
                    monto: this.monto,
                    upload_date: this.fecha,
                    upload_time: this.toolsService.getHourNow()
                }
                this.sPagoService.updatePago(this.pago.id, JSON.parse(JSON.stringify(json))).subscribe({
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
                    tipo_pago_id: this.tPago_id,
                    name: this.nombre,
                    monto: this.monto,
                    upload_date: this.fecha,
                    upload_time: this.toolsService.getHourNow()
                }
                this.sPagoService.savePago(JSON.parse(JSON.stringify(json))).subscribe({
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
        this.dialogPago = false;
        this.submitted = false;
        this.dialogDeletePago = false;
        this.pago = {};
        //clear inputs form
        this.nombre = null;
        this.monto = null;
        this.colono_id = null;
        this.tPago_id = null;
        this.fecha = null;
    }
}
