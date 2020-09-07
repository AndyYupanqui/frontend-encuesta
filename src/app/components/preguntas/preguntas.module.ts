import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreguntasRoutingModule } from './preguntas-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PreguntasComponent } from './preguntas.component';
import { CustomMaterialModule } from "../../core-angular-material/material.module";
import { PreguntaEditComponent } from '../pregunta-edit/pregunta-edit.component';

@NgModule({
  declarations: [
    PreguntasComponent,
    PreguntaEditComponent
  ],
  imports: [
    CommonModule,
    PreguntasRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PreguntasRoutingModule,
    CustomMaterialModule
  ]
})
export class PreguntasModule { }
