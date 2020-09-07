import { Component, OnInit, ViewChild } from '@angular/core';
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
      pregunta: ['', Validators.required],
      dimension: ['', [Validators.required]]
    });
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private _preguntasService: PreguntasService,
    private formBuilder: FormBuilder
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
          this.resultado_preguntas[i] = {numero: res.preguntas[i]["id_pregunta"], pregunta: res.preguntas[i]["descripcion"].slice(3), dimension: dimension};
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

    var dimension = this.nuevoPreguntaForm.value.dimension;
    var id_dimension;

    switch(dimension){
      case "fiabilidad": id_dimension = "1";break;
      case "capacidad_respuesta": id_dimension = "2";break;
      case "seguridad": id_dimension = "3";break;
      case "empatia": id_dimension = "4";break;
      case "tangibilidad": id_dimension = "5";break;
    }

    var nuevaPregunta = {descripcion: this.nuevoPreguntaForm.value.pregunta, id_dimension: id_dimension};

    this._preguntasService.nuevaPregunta(nuevaPregunta).subscribe(
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
  
  // guardarCliente() {
  //   if (this.nuevoClienteForm.invalid) {
  //     Swal.fire({
  //       type: 'error',
  //       title: 'Datos inválidos',
  //       text: 'Revise nuevamente y llene correctamente los campos.'
  //     })
  //     return;
  //   }
  //   this._clienteService.nuevoCliente(this.nuevoClienteForm.value).subscribe(
  //     res => {
  //       this._uploadService.makeFileRequest(Global.url + "/upload-image/" + res.cliente._id, [], this.filesToUpload, 'img')
  //         .then((result: any) => {
  //           console.log(result);
  //         })
  //       Swal.fire({
  //         type: 'success',
  //         title: 'El cliente ha sido añadido',
  //         confirmButtonColor: '#3085d6',
  //         showConfirmButton: true,
  //       }).then(
  //         result => {
  //           $('#modalNuevoCliente').modal('hide');
  //           this.listarClientes();
  //           this.nuevoClienteForm.reset();
  //         }
  //       )
  //     },
  //     err => {
  //       console.log(err);
  //     }
  //   )
  // }

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
              'LA pregunta ha sido borrado correctamente',
              'success'
            )
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
