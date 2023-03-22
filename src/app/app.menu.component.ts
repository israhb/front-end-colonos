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
                <p class="font-bold"><small class="version-color">SA Ver. 1.0.0</small></p>
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
                    {label: 'Dashboard',icon: 'pi pi-fw pi-home', routerLink: ['/home'], rol: 'dashboard' }
                ]
            },
            {
                label: 'Admin',
                items: [
                    {label: 'Folios', icon: 'pi pi-fw pi-user-edit', routerLink: ['/home/folios'], rol: 'folios'},
                    {label: 'Estados', icon: 'pi pi-fw pi-phone', routerLink: ['/home/estados'], rol: 'estados'},
                    {label: 'Fraccionamientos', icon: 'pi pi-fw pi-users', routerLink: ['/home/fraccionamiento'], rol: 'fraccionamientos'},
                    // {label: 'Niveles', icon: 'pi pi-fw pi-users', routerLink: ['/home'], rol: 'niveles'},
                    // {label: 'Monedas', icon: 'pi pi-fw pi-user', routerLink: ['/home'], rol: 'monedas'},
                    {label: 'Tipos de Comunicado', icon: 'pi pi-fw pi-user-edit', routerLink: ['/home/tipoComunicado'], rol: 'tipo_comunicado'},
                    {label: 'Tipos de Negocio', icon: 'pi pi-fw pi-phone', routerLink: ['/home/tipoNegocio'], rol: 'tipo_negocio'},
                    {label: 'Tipos de Pago', icon: 'pi pi-fw pi-users', routerLink: ['/home/tipoPago'], rol: 'tipo_pago'},
                    {label: 'Tipos de Servicio', icon: 'pi pi-fw pi-users', routerLink: ['/home/tipoServicio'], rol: 'tipo_servicio'},
                    {label: 'Tipos de Transporte', icon: 'pi pi-fw pi-user', routerLink: ['/home/tipoTransporte'], rol: 'tipo_transporte'},
                    {label: 'Tipos de Visita', icon: 'pi pi-fw pi-user', routerLink: ['/home/tipoVisita'], rol: 'tipo_visita'},
                ]
            },
            {
                label: 'Administración Colonos',
                items: [
                    {label: 'Colonos', icon: 'pi pi-fw pi-user-edit', routerLink: ['/home'], rol: 'colonos'},
                    {label: 'Visitas', icon: 'pi pi-fw pi-phone', routerLink: ['/home'], rol: 'visitas'},
                    {label: 'Negocios', icon: 'pi pi-fw pi-users', routerLink: ['/home'], rol: 'negocios'},
                    {label: 'Comunicados', icon: 'pi pi-fw pi-users', routerLink: ['/home'], rol: 'comunicados'},
                    {label: 'Pagos', icon: 'pi pi-fw pi-user', routerLink: ['/home'], rol: 'pagos'},
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
