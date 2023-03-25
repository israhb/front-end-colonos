import { Component, OnInit } from '@angular/core';
import { MessageService} from 'primeng/api';
import { SColonoService } from 'app/service/s-colono/s-colono.service';
import { Colono } from 'app/api/Colono';

@Component({
  selector: 'app-colonos',
  templateUrl: './colonos.component.html',
  providers: [MessageService],
  styleUrls: ['./colonos.component.scss']
})
export class ColonosComponent implements OnInit {

    colono: Colono;
    colonos: Colono[];
    selectedColonos: Colono[];

    constructor(
        private messageService: MessageService,
        private sColonoService:SColonoService,
    ) { }

    ngOnInit(): void {
        this.refreshTable();
    }

    refreshTable(){
        this.sColonoService.getListarColonos().subscribe( (r) => this.colonos = r);
    }

}
