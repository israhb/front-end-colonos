import { Component, OnInit } from '@angular/core';
import { MessageService} from 'primeng/api';
import { ApisGeneralesService } from 'app/service/generales/apis-generales.service';
import { ToolsService } from 'app/service/tools/tools.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  providers: [MessageService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    /******** variables********** */
    submitted: boolean;
    password: string;
    user: string;
    modelLogin: any;
    dataUserPerfil: any;

    constructor(
        private messageService: MessageService,
        private apisGeneralesService:ApisGeneralesService,
        private toolsService:ToolsService,
        private router: Router,
    ) { }
    getLogin(): void{
        this.submitted = true;
        if(this.user != undefined && this.user != null && this.password != undefined && this.password != null ){
          let json = {
            name: this.user,
            password: this.password
          };
          this.apisGeneralesService.loginCredentials(JSON.parse(JSON.stringify(json))).subscribe({
            next: (v) =>{
              if(v != null ){
                this.dataUserPerfil = v;
                this.submitted = false;
              }
            },
            error: (e) =>{
                console.error(e);
                this.messageService.add({severity: 'error', summary: 'Error', detail: 'Credenciales Invalidas', life: 3000});
            },
            complete: () => {
                this.toolsService.user_perfil = this.dataUserPerfil.colono;
                this.toolsService.user_permisions = this.dataUserPerfil.permisos;
                console.log({perfil:this.toolsService.user_perfil, permisos: this.toolsService.user_permisions});
                this.router.navigate(['/home']);
            }
          });
        }else{
          this.messageService.add({severity: 'error', summary: 'Error', detail: 'Ingresa tus Credenciales', life: 3000});
        }
    }
}
