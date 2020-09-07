import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { PreguntaModel } from '../../models/pregunta.model';
import { PreguntasService } from '../../services/preguntas.service';

@Component({
  selector: 'app-seguridad',
  templateUrl: './seguridad.component.html',
  styleUrls: ['./seguridad.component.css'],
  providers: [PreguntasService]
})
export class SeguridadComponent implements OnInit {

  displayedColumns: string[] = ['numero', 'descripcion', 'opciones'];
  dataSource: MatTableDataSource<PreguntaModel>;
  resultado_preguntas = [];
  numero_pregunta: number;
  nombre_pregunta: string;
  estado = false;
  select: any;

  view: any[] = [450, 300];

  // options pie
  gradient_pie: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: string = 'below';

  // options bar
  // options
  showXAxis = true;
  showYAxis = true;
  gradient_bar = false;
  showXAxisLabel = true;
  xAxisLabel = 'Preguntas';
  xAxisLabel1 = 'Nivel de Satisfacción';
  xAxisLabel2 = 'Género';
  xAxisLabel3 = 'Escuela';
  xAxisLabel4 = 'Año de Ingreso';
  showYAxisLabel = true;
  yAxisLabel = 'Cantidad';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#0000FF', '#AAAAAA', '#572364', '#E25F23', '#2271b3', '#008f39']
  };

  constructor(
    private _preguntasService: PreguntasService,
  ) {
    
  }

  ngOnInit() {
    this.listarPreguntas();
    this.realizarGraficas();
  }

  listarPreguntas() {
    this._preguntasService.listarPreguntas().subscribe(
      res => {
        var incrementador = 0;
  
        for(var i=0; i<res.preguntas.length; i++){
          if(res.preguntas[i]["id_dimension"] == 3){
            this.resultado_preguntas[incrementador] = {numero: (incrementador+1), descripcion: res.preguntas[i]["descripcion"].slice(3)};
            incrementador++;
          }
        }
       
        // TABLA
        this.dataSource = new MatTableDataSource(this.resultado_preguntas);
      },
      error => {
        console.log(error);
      }
    );
  }

  realizarGraficas(){
    var dimension = "Seguridad";
    this._preguntasService.listarRespuestaPreguntas().subscribe(
      res => {
        Object.assign(this, { muy_desacuerdo: [{name: res.respuesta[dimension][9]["pregunta"].slice(3), value: res.respuesta[dimension][9]["resultados"]["Muy en Desacuerdo"]}, {name: res.respuesta[dimension][10]["pregunta"].slice(3), value: res.respuesta[dimension][10]["resultados"]["Muy en Desacuerdo"]}, {name: res.respuesta[dimension][11]["pregunta"].slice(3), value: res.respuesta[dimension][11]["resultados"]["Muy en Desacuerdo"]}, {name: res.respuesta[dimension][12]["pregunta"].slice(3), value: res.respuesta[dimension][12]["resultados"]["Muy en Desacuerdo"]}] });
        Object.assign(this, { en_desacuerdo: [{name: res.respuesta[dimension][9]["pregunta"].slice(3), value: res.respuesta[dimension][9]["resultados"]["En Desacuerdo"]}, {name: res.respuesta[dimension][10]["pregunta"].slice(3), value: res.respuesta[dimension][10]["resultados"]["En Desacuerdo"]}, {name: res.respuesta[dimension][11]["pregunta"].slice(3), value: res.respuesta[dimension][11]["resultados"]["En Desacuerdo"]}, {name: res.respuesta[dimension][12]["pregunta"].slice(3), value: res.respuesta[dimension][12]["resultados"]["En Desacuerdo"]}] });
        Object.assign(this, { neutral: [{name: res.respuesta[dimension][9]["pregunta"].slice(3), value: res.respuesta[dimension][9]["resultados"]["Neutral"]}, {name: res.respuesta[dimension][10]["pregunta"].slice(3), value: res.respuesta[dimension][10]["resultados"]["Neutral"]}, {name: res.respuesta[dimension][11]["pregunta"].slice(3), value: res.respuesta[dimension][11]["resultados"]["Neutral"]}, {name: res.respuesta[dimension][12]["pregunta"].slice(3), value: res.respuesta[dimension][12]["resultados"]["Neutral"]}] });
        Object.assign(this, { de_acuerdo: [{name: res.respuesta[dimension][9]["pregunta"].slice(3), value: res.respuesta[dimension][9]["resultados"]["De Acuerdo"]}, {name: res.respuesta[dimension][10]["pregunta"].slice(3), value: res.respuesta[dimension][10]["resultados"]["De Acuerdo"]}, {name: res.respuesta[dimension][11]["pregunta"].slice(3), value: res.respuesta[dimension][11]["resultados"]["De Acuerdo"]}, {name: res.respuesta[dimension][12]["pregunta"].slice(3), value: res.respuesta[dimension][12]["resultados"]["De Acuerdo"]}] });
        Object.assign(this, { muy_acuerdo: [{name: res.respuesta[dimension][9]["pregunta"].slice(3), value: res.respuesta[dimension][9]["resultados"]["Muy de Acuerdo"]}, {name: res.respuesta[dimension][10]["pregunta"].slice(3), value: res.respuesta[dimension][10]["resultados"]["Muy de Acuerdo"]}, {name: res.respuesta[dimension][11]["pregunta"].slice(3), value: res.respuesta[dimension][11]["resultados"]["Muy de Acuerdo"]}, {name: res.respuesta[dimension][12]["pregunta"].slice(3), value: res.respuesta[dimension][12]["resultados"]["Muy de Acuerdo"]}] });
      }
    );
  }

  modalPregunta(numero, descripcion){
    this.numero_pregunta = numero;
    this.nombre_pregunta = descripcion;
    var dimension = "Seguridad";
    this._preguntasService.listarRespuestaPreguntas().subscribe(
      res => {
        Object.assign(this, { pregunta: [{name: "Muy en desacuerdo", value: res.respuesta[dimension][numero+8]["resultados"]["Muy en Desacuerdo"]}, {name: "En desacuerdo", value: res.respuesta[dimension][numero+8]["resultados"]["En Desacuerdo"]}, {name: "Neutral", value: res.respuesta[dimension][numero+8]["resultados"]["Neutral"]}, {name: "De acuerdo", value: res.respuesta[dimension][numero+8]["resultados"]["De Acuerdo"]}, {name: "Muy de acuerdo", value: res.respuesta[dimension][numero+8]["resultados"]["Muy de Acuerdo"]}] });
      }
    );
  }

  verGrafica(nivel){
    this.estado = false;
    var id_pregunta = (this.numero_pregunta+8);
    this._preguntasService.listarRespuestaDetallePregunta(id_pregunta).subscribe(
      res => {
        switch(nivel){
          case "Muy en Desacuerdo": Object.assign(this, { genero: [{name: "Masculino", value: res.respuesta["respuestas"][nivel]["sexo"]["M"]}, {name: "Femenino", value: res.respuesta["respuestas"][nivel]["sexo"]["F"]}] });
                                    Object.assign(this, { escuela: [{name: "Ingeniería de Sistemas", value: res.respuesta["respuestas"][nivel]["escuela"]["Ingeniería de Sistemas"]}, {name: "Ingeniería de Software", value: res.respuesta["respuestas"][nivel]["escuela"]["Ingeniería de Software"]}] });
                                    Object.assign(this, { anio_ingreso: [{name: "2006", value: res.respuesta["respuestas"][nivel]["anio_ingreso"]["2006"]}, {name: "2014", value: res.respuesta["respuestas"][nivel]["anio_ingreso"]["2014"]}, {name: "2015", value: res.respuesta["respuestas"][nivel]["anio_ingreso"]["2015"]}, {name: "2016", value: res.respuesta["respuestas"][nivel]["anio_ingreso"]["2016"]}, {name: "2017", value: res.respuesta["respuestas"][nivel]["anio_ingreso"]["2017"]}, {name: "2018", value: res.respuesta["respuestas"][nivel]["anio_ingreso"]["2018"]}, {name: "2019", value: res.respuesta["respuestas"][nivel]["anio_ingreso"]["2019"]}, {name: "2020", value: res.respuesta["respuestas"][nivel]["anio_ingreso"]["2020"]}, {name: "2021", value: res.respuesta["respuestas"][nivel]["anio_ingreso"]["2021"]}] });
                                    break;
          case "En Desacuerdo":     Object.assign(this, { genero: [{name: "Masculino", value: res.respuesta["respuestas"][nivel]["sexo"]["M"]}, {name: "Femenino", value: res.respuesta["respuestas"][nivel]["sexo"]["F"]}] });
                                    Object.assign(this, { escuela: [{name: "Ingeniería de Sistemas", value: res.respuesta["respuestas"][nivel]["escuela"]["Ingeniería de Sistemas"]}, {name: "Ingeniería de Software", value: res.respuesta["respuestas"][nivel]["escuela"]["Ingeniería de Software"]}] });
                                    Object.assign(this, { anio_ingreso: [{name: "2006", value: res.respuesta["respuestas"][nivel]["anio_ingreso"]["2006"]}, {name: "2014", value: res.respuesta["respuestas"][nivel]["anio_ingreso"]["2014"]}, {name: "2015", value: res.respuesta["respuestas"][nivel]["anio_ingreso"]["2015"]}, {name: "2016", value: res.respuesta["respuestas"][nivel]["anio_ingreso"]["2016"]}, {name: "2017", value: res.respuesta["respuestas"][nivel]["anio_ingreso"]["2017"]}, {name: "2018", value: res.respuesta["respuestas"][nivel]["anio_ingreso"]["2018"]}, {name: "2019", value: res.respuesta["respuestas"][nivel]["anio_ingreso"]["2019"]}, {name: "2020", value: res.respuesta["respuestas"][nivel]["anio_ingreso"]["2020"]}, {name: "2021", value: res.respuesta["respuestas"][nivel]["anio_ingreso"]["2021"]}] });
                                    break;
          case "Neutral":           Object.assign(this, { genero: [{name: "Masculino", value: res.respuesta["respuestas"][nivel]["sexo"]["M"]}, {name: "Femenino", value: res.respuesta["respuestas"][nivel]["sexo"]["F"]}] });
                                    Object.assign(this, { escuela: [{name: "Ingeniería de Sistemas", value: res.respuesta["respuestas"][nivel]["escuela"]["Ingeniería de Sistemas"]}, {name: "Ingeniería de Software", value: res.respuesta["respuestas"][nivel]["escuela"]["Ingeniería de Software"]}] });
                                    Object.assign(this, { anio_ingreso: [{name: "2006", value: res.respuesta["respuestas"][nivel]["anio_ingreso"]["2006"]}, {name: "2014", value: res.respuesta["respuestas"][nivel]["anio_ingreso"]["2014"]}, {name: "2015", value: res.respuesta["respuestas"][nivel]["anio_ingreso"]["2015"]}, {name: "2016", value: res.respuesta["respuestas"][nivel]["anio_ingreso"]["2016"]}, {name: "2017", value: res.respuesta["respuestas"][nivel]["anio_ingreso"]["2017"]}, {name: "2018", value: res.respuesta["respuestas"][nivel]["anio_ingreso"]["2018"]}, {name: "2019", value: res.respuesta["respuestas"][nivel]["anio_ingreso"]["2019"]}, {name: "2020", value: res.respuesta["respuestas"][nivel]["anio_ingreso"]["2020"]}, {name: "2021", value: res.respuesta["respuestas"][nivel]["anio_ingreso"]["2021"]}] });
                                    break;
          case "De Acuerdo":        Object.assign(this, { genero: [{name: "Masculino", value: res.respuesta["respuestas"][nivel]["sexo"]["M"]}, {name: "Femenino", value: res.respuesta["respuestas"][nivel]["sexo"]["F"]}] });
                                    Object.assign(this, { escuela: [{name: "Ingeniería de Sistemas", value: res.respuesta["respuestas"][nivel]["escuela"]["Ingeniería de Sistemas"]}, {name: "Ingeniería de Software", value: res.respuesta["respuestas"][nivel]["escuela"]["Ingeniería de Software"]}] });
                                    Object.assign(this, { anio_ingreso: [{name: "2006", value: res.respuesta["respuestas"][nivel]["anio_ingreso"]["2006"]}, {name: "2014", value: res.respuesta["respuestas"][nivel]["anio_ingreso"]["2014"]}, {name: "2015", value: res.respuesta["respuestas"][nivel]["anio_ingreso"]["2015"]}, {name: "2016", value: res.respuesta["respuestas"][nivel]["anio_ingreso"]["2016"]}, {name: "2017", value: res.respuesta["respuestas"][nivel]["anio_ingreso"]["2017"]}, {name: "2018", value: res.respuesta["respuestas"][nivel]["anio_ingreso"]["2018"]}, {name: "2019", value: res.respuesta["respuestas"][nivel]["anio_ingreso"]["2019"]}, {name: "2020", value: res.respuesta["respuestas"][nivel]["anio_ingreso"]["2020"]}, {name: "2021", value: res.respuesta["respuestas"][nivel]["anio_ingreso"]["2021"]}] });
                                    break;
          case "Muy de Acuerdo":    Object.assign(this, { genero: [{name: "Masculino", value: res.respuesta["respuestas"][nivel]["sexo"]["M"]}, {name: "Femenino", value: res.respuesta["respuestas"][nivel]["sexo"]["F"]}] });
                                    Object.assign(this, { escuela: [{name: "Ingeniería de Sistemas", value: res.respuesta["respuestas"][nivel]["escuela"]["Ingeniería de Sistemas"]}, {name: "Ingeniería de Software", value: res.respuesta["respuestas"][nivel]["escuela"]["Ingeniería de Software"]}] });
                                    Object.assign(this, { anio_ingreso: [{name: "2006", value: res.respuesta["respuestas"][nivel]["anio_ingreso"]["2006"]}, {name: "2014", value: res.respuesta["respuestas"][nivel]["anio_ingreso"]["2014"]}, {name: "2015", value: res.respuesta["respuestas"][nivel]["anio_ingreso"]["2015"]}, {name: "2016", value: res.respuesta["respuestas"][nivel]["anio_ingreso"]["2016"]}, {name: "2017", value: res.respuesta["respuestas"][nivel]["anio_ingreso"]["2017"]}, {name: "2018", value: res.respuesta["respuestas"][nivel]["anio_ingreso"]["2018"]}, {name: "2019", value: res.respuesta["respuestas"][nivel]["anio_ingreso"]["2019"]}, {name: "2020", value: res.respuesta["respuestas"][nivel]["anio_ingreso"]["2020"]}, {name: "2021", value: res.respuesta["respuestas"][nivel]["anio_ingreso"]["2021"]}] });
                                    break;
        }
        this.estado = true;
      }
    );
  }

  cerrar(){
    this.estado = false;
    this.select = "";
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onSelect(data): void {
    //console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    //console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    //console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

}
