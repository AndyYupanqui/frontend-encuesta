import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ErrorComponent } from './components/error/error.component';
import { HomeLayoutComponent } from './layout/home-layout/home-layout.component';
import { LoginLayoutComponent } from './layout/login-layout/login-layout.component';
import { GeneralComponent } from './components/general/general.component';
import { CapacidadRespuestaComponent } from './components/capacidad-respuesta/capacidad-respuesta.component';
import { SeguridadComponent } from './components/seguridad/seguridad.component';
import { FiabilidadComponent } from './components/fiabilidad/fiabilidad.component';
import { EmpatiaComponent } from './components/empatia/empatia.component';
import { TangibilidadComponent } from './components/tangibilidad/tangibilidad.component';

import { AuthGuard } from './services/auth.guard';


const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginLayoutComponent,
    children: [
      { path: '', loadChildren: './components/login/login.module#LoginModule' }]
  },
  {
    path: 'home', component: HomeLayoutComponent, 
    children: [
      { path: 'preguntas', loadChildren: './components/preguntas/preguntas.module#PreguntasModule' },
      { path: 'general', component: GeneralComponent },
      { path: 'capacidad-respuesta', component: CapacidadRespuestaComponent },
      { path: 'seguridad', component: SeguridadComponent },
      { path: 'fiabilidad', component: FiabilidadComponent },
      { path: 'empatia', component: EmpatiaComponent },
      { path: 'tangibilidad', component: TangibilidadComponent }
    ]
  },
  { path: '**', component: ErrorComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

