import { Component, OnInit } from '@angular/core';
import { Folios } from 'app/api/folios';
import { MessageService} from 'primeng/api';
import { SFolioService } from 'app/service/s-folio/s-folio.service';

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
    /************* modales ***************** */
    dialogFolio: boolean = false;

    constructor(
        private messageService: MessageService,
        private sFolioService:SFolioService,
    ) { }

    ngOnInit(): void {
        this.refresTable();
    }

    refresTable(){
        this.sFolioService.getListarFolios().subscribe( (r) => this.folios = r);
    }

    dialogAddUpFolio(folio: Folios, bandera: boolean){
        this.banAddUp = bandera;
        if(bandera){//update
            this.folio = {...folio};
        }else{//create

        }
        this.dialogFolio = true;
    }

    clearAndClouse(){
        this.dialogFolio = false;
    }
}
