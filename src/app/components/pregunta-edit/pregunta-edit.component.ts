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

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private _preguntasService: PreguntasService,
    private _router: Router
  ) { }

  ngOnInit() {
    // this.idParam = this.route.snapshot.paramMap.get('id')
    // this.buildForm()
    // this._preguntasService.buscarPregunta(this.idParam).subscribe(
    //   res => {
    //     this.pregunta = res.pregunta[0];
    //     this.editPreguntaForm.patchValue({
    //       nombres: this.cliente.nombres,
    //       apellidos: this.cliente.apellidos,
    //       direccion: this.cliente.direccion,
    //       telefono: this.cliente.telefono,
    //       celular: this.cliente.celular,
    //       email: this.cliente.email,
    //       dni: this.cliente.dni
    //     })
    //   }
    // )
  }

  // private buildForm() {
  //   return this.editPreguntaForm = this.formBuilder.group({
  //     pregunta: ['', [Validators.required]],
  //     dimension: ['', [Validators.required]],
  //   });
  // }

  // verValor() {
  //   if (this.editPreguntaForm.invalid) {
  //     Swal.fire({
  //       type: 'error',
  //       title: 'Datos inválidos',
  //       text: 'Revise nuevamente y llene todos los campos correctamente.'
  //     })
  //     return;
  //   }

  //   this._preguntasService.actualizarPregunta(this.cliente._id, this.editClienteForm.value).subscribe(
  //     res => {
  //       Swal.fire({
  //         type: 'success',
  //         title: 'La operación fue exitosa!',
  //         text: 'Editado correctamente.'
  //       }).then((result) => {
  //         if (result.value) {
  //           this._router.navigateByUrl('/home/preguntas')
  //         }
  //       });
  //     },
  //     err => { console.log(err) }
  //   )
  // }


}