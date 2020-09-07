import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { PreguntasService } from '../../services/preguntas.service';
import { MatPaginatorIntl } from '@angular/material';
import Swal from 'sweetalert2'
import { MatPaginatorIntlCro } from '../../utils/matPaginator.util'
import { PreguntaModel } from '../../models/pregunta.model';
declare var $: any;

@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.css'],
  providers: [PreguntasService, { provide: MatPaginatorIntl, useClass: MatPaginatorIntlCro }]
})

export class PreguntasComponent implements OnInit {
  empleados: any;
  displayedColumns: string[] = ['numero', 'pregunta', 'dimension', 'acciones'];
  dataSource: MatTableDataSource<PreguntaModel>;
  public nuevoPreguntaForm: FormGroup;
  resultado_preguntas = [];

  private buildForm() {
    return this.nuevoPreguntaForm = this.formBuilder.group({
      descripcion: ['', Validators.required],
      id_dimension: ['', [Validators.required]]
    });
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private _preguntasService: PreguntasService,
    private formBuilder: FormBuilder,
    private _router: Router
  ) { }

  ngOnInit() {
    this.listarPreguntas();
    this.buildForm();
  }

  listarPreguntas() {
    var dimension = "";
    this._preguntasService.listarPreguntas().subscribe(
      res => {
        for(var i=0; i<res.preguntas.length; i++){
          switch(res.preguntas[i]["id_dimension"]){
            case 1: dimension = "Fiabilidad";break;
            case 2: dimension = "Capacidad de Respuesta";break;
            case 3: dimension = "Seguridad";break;
            case 4: dimension = "Empatía";break;
            case 5: dimension = "Tangibilidad";break;
          }
          this.resultado_preguntas[i] = {numero: res.preguntas[i]["id_pregunta"], pregunta: res.preguntas[i]["descripcion"], dimension: dimension};
        }
        this.dataSource = new MatTableDataSource(this.resultado_preguntas);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => {
        console.log(error);
      }
    )
  }

  guardarPregunta() {
    if (this.nuevoPreguntaForm.invalid) {
      Swal.fire({
        type: 'error',
        title: 'Datos inválidos',
        text: 'Revise nuevamente y llene todos los campos correctamente.'
      })
      return;
    }

    var formData = new FormData();

    formData.append('descripcion', this.nuevoPreguntaForm.value.descripcion);
    formData.append('id_dimension', this.nuevoPreguntaForm.value.id_dimension);

    this._preguntasService.nuevaPregunta(formData).subscribe(
      res => {
        Swal.fire({
          type: 'success',
          title: 'La pregunta se ha sido añadido',
          confirmButtonColor: '#3085d6',
          showConfirmButton: true,
        }).then(
          result => {
            $('#modalNuevaPregunta').modal('hide');
            this.listarPreguntas();
            this.nuevoPreguntaForm.reset();
          }
        )
      },
      err => {
        console.log(err);
      }
    )
  }

  borrarPregunta(id_pregunta) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "El cambio no se podrá revertir!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this._preguntasService.eliminarPregunta(id_pregunta).subscribe(
          result => {
            this.listarPreguntas();
            Swal.fire(
              'Borrado!',
              'La pregunta ha sido borrado correctamente',
              'success'
            ).then(
              result => {
                location.reload();
              }
            );
          },
          err => {
            console.log(err);
            Swal.fire({
              type: 'error',
              title: 'Oops...',
              text: 'Algo salió mal!'
            });
          }
        )
      }
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  cerrar() {
    this.nuevoPreguntaForm.reset();
  }
}
