import { Component, OnInit } from '@angular/core';
import { MessageService, MenuItem } from 'primeng/api';
import { ToolsService } from 'app/service/tools/tools.service';
import { ApisGeneralesService } from 'app/service/generales/apis-generales.service';
import { Campania } from 'app/api/Campania';
import { RolesPermisosDirective } from 'app/directives/roles-permisos/roles-permisos.directive';

@Component({
  selector: 'app-campanias',
  templateUrl: './campanias.component.html',
  providers: [MessageService, RolesPermisosDirective],
  styleUrls: ['./campanias.component.scss',
  '../../../assets/sass/layout/_buttons.scss']
})
export class CampaniasComponent implements OnInit {
    /********* TABLA ********************** */
   usuario: Campania;
   usuarios: Campania[];
   /****************BOTONES********************* */
   submitted: boolean; //submit para agregar info
   banAddUpdate: boolean;
   itemsMenuOptions: MenuItem[]; //opciones de la toolbar

   /************ DIALOGS *************************/
   dialogAdd: boolean;
   deleteDialog: boolean;
   /************ FORMULARIO ************************ */
   form_model_nombre: string;
   form_model_usuario: string;
   form_model_password: string;
   form_model_telefono: string;
   form_model_correo: string;
   form_model_campania: number; form_model_options_campania: Campania;

    constructor(
        private messageService: MessageService,
        private toolsService:ToolsService,
        private apisGeneralesService:ApisGeneralesService,
        private rolesPermisosDirective:RolesPermisosDirective,
    ) { }

    ngOnInit(): void {
        let btnAdd = this.rolesPermisosDirective.checkPermisos?.('add') ?
        {
            label: '',
            icon: 'pi pi-plus',
            title: 'Agregar',
            styleClass: 'successButton',
            command: () => {
                //this.openAddUpdateDialog(false, {}, false);
            }
        } : {};
        this.itemsMenuOptions = [
            btnAdd,
        ];
        this.refreshTable();
    }
    refreshTable(){
        let json = {
          auth_token: this.toolsService.user_perfil['us_token']
        };
        this.apisGeneralesService.postListarCampanias(JSON.parse(JSON.stringify(json))).subscribe((r) => this.usuarios = this.toolsService.getGenerateNumeracionTables(r['data']));
    }
}
