import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AppMainComponent } from './app.main.component';
import { LoginComponent } from '@components/login/login.component';
import { RolesModulosGuard } from './guards/roles-modulos.guard';
import { FoliosComponent } from '@components/folios/folios.component';
import { EstadosComponent } from '@components/estados/estados.component';
import { FraccionamientosComponent } from '@components/fraccionamientos/fraccionamientos.component';
import { TipoComunicadoComponent } from '@components/tipo-comunicado/tipo-comunicado.component';
import { TipoNegocioComponent } from '@components/tipo-negocio/tipo-negocio.component';
import { TipoPagoComponent } from '@components/tipo-pago/tipo-pago.component';
import { TipoServicioComponent } from '@components/tipo-servicio/tipo-servicio.component';
import { TipoTransporteComponent } from '@components/tipo-transporte/tipo-transporte.component';
import { TipoVisitaComponent } from '@components/tipo-visita/tipo-visita.component';
import { PagoComponent } from '@components/pago/pago.component';
import { ComunicadoComponent } from '@components/comunicado/comunicado.component';
@NgModule({
    imports: [
        RouterModule.forRoot([
            {path: '', component: LoginComponent},
            {
                path: 'home', component: AppMainComponent,
                children: [
                    {
                        path: '', component: DashboardComponent,
                        data: {
                            page: 'Panel Principal'
                        },
                        canActivate: [RolesModulosGuard]
                    },
                    {
                        path: 'folios',
                        component: FoliosComponent,
                        data: {
                            section: 'Folios',
                            page: 'Listado de Folios'
                        },
                        canActivate: [RolesModulosGuard]
                    },
                    {
                        path: 'estados',
                        component: EstadosComponent,
                        data: {
                            section: 'Estados',
                            page: 'Listado de Estados'
                        },
                        canActivate: [RolesModulosGuard]
                    },
                    {
                        path: 'fraccionamiento',
                        component: FraccionamientosComponent,
                        data: {
                            section: 'Fraccionamiento',
                            page: 'Listado de Fraccionamientos'
                        },
                        canActivate: [RolesModulosGuard]
                    },
                    {
                        path: 'tipoComunicado',
                        component: TipoComunicadoComponent,
                        data: {
                            section: 'TipoComunicado',
                            page: 'Listado de Tipos de Comunicado'
                        },
                        canActivate: [RolesModulosGuard]
                    },
                    {
                        path: 'tipoNegocio',
                        component: TipoNegocioComponent,
                        data: {
                            section: 'TipoNegocio',
                            page: 'Listado de Tipos de Negocio'
                        },
                        canActivate: [RolesModulosGuard]
                    },
                    {
                        path: 'tipoPago',
                        component: TipoPagoComponent,
                        data: {
                            section: 'TipoPago',
                            page: 'Listado de Tipos de Pago'
                        },
                        canActivate: [RolesModulosGuard]
                    },
                    {
                        path: 'tipoServicio',
                        component: TipoServicioComponent,
                        data: {
                            section: 'TipoServicio',
                            page: 'Listado de Tipos de Servicio'
                        },
                        canActivate: [RolesModulosGuard]
                    },
                    {
                        path: 'tipoTransporte',
                        component: TipoTransporteComponent,
                        data: {
                            section: 'TipoTransporte',
                            page: 'Listado de Tipos de Transporte'
                        },
                        canActivate: [RolesModulosGuard]
                    },
                    {
                        path: 'tipoVisita',
                        component: TipoVisitaComponent,
                        data: {
                            section: 'TipoVisita',
                            page: 'Listado de Tipos de Visita'
                        },
                        canActivate: [RolesModulosGuard]
                    },
                    {
                        path: 'pagos',
                        component: PagoComponent,
                        data: {
                            section: 'Pagos',
                            page: 'Listado de Pagos'
                        },
                        canActivate: [RolesModulosGuard]
                    },
                    {
                        path: 'comunicados',
                        component: ComunicadoComponent,
                        data: {
                            section: 'Comunicados',
                            page: 'Listado de Comunicados'
                        },
                        canActivate: [RolesModulosGuard]
                    }
                ],
            },
            {path: '**', redirectTo: 'pages/notfound'},
        ], {scrollPositionRestoration: 'enabled', anchorScrolling:'enabled'})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
