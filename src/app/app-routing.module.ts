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
