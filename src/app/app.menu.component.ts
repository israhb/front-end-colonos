import { Component, OnInit } from '@angular/core';
import { AppMainComponent } from './app.main.component';

@Component({
    selector: 'app-menu',
    template: `
        <div class="layout-menu-container">
            <ul class="layout-menu" role="menu" (keydown)="onKeydown($event)">
                <li app-menu class="layout-menuitem-category" *ngFor="let item of model; let i = index;" [item]="item" [index]="i" [root]="true" role="none">
                    <div class="layout-menuitem-root-text" [attr.aria-label]="item.label">{{item.label}}</div>
                    <ul role="menu" *ngFor="let child of item.items" >
                        <li app-menuitem *appRolesModulos="child.rol" [item]="child" [index]="i"  role="none"></li>
                    </ul>
                </li>
                <p-divider></p-divider>
                <p class="font-bold"><small class="version-color">SC Ver. 1.0.0</small></p>
            </ul>
        </div>
    `
})
export class AppMenuComponent implements OnInit {

    model: any[];

    constructor(public appMain: AppMainComponent) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Panel principal',
                items:[
                    {label: 'Mi Perfil',icon: '', routerLink: ['/home'], rol: 'dashboard' },
                    {label: 'Dashboard',icon: '', routerLink: ['/home'], rol: 'dashboard' }
                ]
            },
            {
                label: 'Admin',
                items: [
                    {label: 'Folios', icon: '', routerLink: ['/home/folios'], rol: 'folios'},
                    {label: 'Estados', icon: '', routerLink: ['/home/estados'], rol: 'estados'},
                    {label: 'Fraccionamientos', icon: '', routerLink: ['/home/fraccionamiento'], rol: 'fraccionamientos'},
                    // {label: 'Niveles', icon: 's', routerLink: ['/home'], rol: 'niveles'},
                    // {label: 'Monedas', icon: '', routerLink: ['/home'], rol: 'monedas'},
                    {label: 'Tipos de Comunicado', icon: '', routerLink: ['/home/tipoComunicado'], rol: 'tipo_comunicado'},
                    {label: 'Tipos de Negocio', icon: '', routerLink: ['/home/tipoNegocio'], rol: 'tipo_negocio'},
                    {label: 'Tipos de Pago', icon: '', routerLink: ['/home/tipoPago'], rol: 'tipo_pago'},
                    {label: 'Tipos de Servicio', icon: '', routerLink: ['/home/tipoServicio'], rol: 'tipo_servicio'},
                    {label: 'Tipos de Transporte', icon: '', routerLink: ['/home/tipoTransporte'], rol: 'tipo_transporte'},
                    {label: 'Tipos de Visita', icon: '', routerLink: ['/home/tipoVisita'], rol: 'tipo_visita'},
                ]
            },
            {
                label: 'Administración Colonos',
                items: [
                    {label: 'Colonos', icon: '', routerLink: ['/home/colonos'], rol: 'colonos'},
                    {label: 'Visitas', icon: '', routerLink: ['/home/visitas'], rol: 'visitas'},
                    {label: 'Negocios', icon: '', routerLink: ['/home/negocios'], rol: 'negocios'},
                    {label: 'Comunicados', icon: '', routerLink: ['/home/comunicados'], rol: 'comunicados'},
                    {label: 'Pagos', icon: '', routerLink: ['/home/pagos'], rol: 'pagos'},
                ]
            }
        ];
    }

    onKeydown(event: KeyboardEvent) {
        const nodeElement = (<HTMLDivElement> event.target);
        if (event.code === 'Enter' || event.code === 'Space') {
            nodeElement.click();
            event.preventDefault();
        }
    }
}
