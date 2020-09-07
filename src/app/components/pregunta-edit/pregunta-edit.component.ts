import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PreguntasService } from '../../services/preguntas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pregunta-edit',
  templateUrl: './pregunta-edit.component.html',
  styleUrls: ['./pregunta-edit.component.css'],
  providers: [PreguntasService]
})

export class PreguntaEditComponent implements OnInit {
  public idParam: string;
  editPreguntaForm: FormGroup;
  public pregunta: any;
  selected: any;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private _preguntasService: PreguntasService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.idParam = this.route.snapshot.paramMap.get('id');
    this.buildForm();
    this._preguntasService.buscarPregunta(this.idParam).subscribe(
      res => {
        this.pregunta = res.pregunta;
        this.editPreguntaForm.patchValue({
          descripcion: this.pregunta.descripcion,
          id_dimension: this.pregunta.id_dimension,
        });
        this.selected = String(this.pregunta.id_dimension);
      }
    )
  }

  private buildForm() {
    return this.editPreguntaForm = this.formBuilder.group({
      descripcion: ['', [Validators.required]],
      id_dimension: ['', [Validators.required]],
    });
  }

  actualizarPregunta() {
    if (this.editPreguntaForm.invalid) {
      Swal.fire({
        type: 'error',
        title: 'Datos inválidos',
        text: 'Revise nuevamente y llene todos los campos correctamente.'
      });
      return;
    }

    var formData = new FormData();

    formData.append('descripcion', this.editPreguntaForm.value.descripcion);
    formData.append('id_dimension', this.editPreguntaForm.value.id_dimension);
  

    this._preguntasService.editarPregunta(this.idParam, formData).subscribe(
      res => {
        Swal.fire({
          type: 'success',
          title: 'La operación fue exitosa!',
          text: 'Editado correctamente.'
        }).then((result) => {
          if (result.value) {
            this._router.navigateByUrl('/home/preguntas');
          }
        });
      },
      err => { console.log(err); }
    )
  }


}