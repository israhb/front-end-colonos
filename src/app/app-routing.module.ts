import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AppMainComponent } from './app.main.component';
import { LoginComponent } from '@components/login/login.component';
import { RolesModulosGuard } from './guards/roles-modulos.guard';
import { FoliosComponent } from '@components/folios/folios.component';
import { EstadosComponent } from '@components/estados/estados.component';
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
