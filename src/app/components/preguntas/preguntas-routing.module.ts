import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PreguntasComponent } from './preguntas.component';
import { AuthGuard } from '../../services/auth.guard';
import { PreguntaEditComponent } from '../pregunta-edit/pregunta-edit.component';

const routes: Routes = [
  {path: '', component: PreguntasComponent  },
  {path: ':id', component: PreguntaEditComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PreguntasRoutingModule { }
