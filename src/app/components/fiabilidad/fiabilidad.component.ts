import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { PreguntaModel } from '../../models/pregunta.model';
import { PreguntasService } from '../../services/preguntas.service';

@Component({
  selector: 'app-fiabilidad',
  templateUrl: './fiabilidad.component.html',
  styleUrls: ['./fiabilidad.component.css'],
  providers: [PreguntasService]
})
export class FiabilidadComponent implements OnInit {

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
          if(res.preguntas[i]["id_dimension"] == 1){
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
    var dimension = "Fiabilidad";
    this._preguntasService.listarRespuestaPreguntas().subscribe(
      res => {
        Object.assign(this, { muy_desacuerdo: [{name: res.respuesta[dimension][1]["pregunta"].slice(3), value: res.respuesta[dimension][1]["resultados"]["Muy en Desacuerdo"]}, {name: res.respuesta[dimension][2]["pregunta"].slice(3), value: res.respuesta[dimension][2]["resultados"]["Muy en Desacuerdo"]}, {name: res.respuesta[dimension][3]["pregunta"].slice(3), value: res.respuesta[dimension][3]["resultados"]["Muy en Desacuerdo"]}, {name: res.respuesta[dimension][4]["pregunta"].slice(3), value: res.respuesta[dimension][4]["resultados"]["Muy en Desacuerdo"]}] });
        Object.assign(this, { en_desacuerdo: [{name: res.respuesta[dimension][1]["pregunta"].slice(3), value: res.respuesta[dimension][1]["resultados"]["En Desacuerdo"]}, {name: res.respuesta[dimension][2]["pregunta"].slice(3), value: res.respuesta[dimension][2]["resultados"]["En Desacuerdo"]}, {name: res.respuesta[dimension][3]["pregunta"].slice(3), value: res.respuesta[dimension][3]["resultados"]["En Desacuerdo"]}, {name: res.respuesta[dimension][4]["pregunta"].slice(3), value: res.respuesta[dimension][4]["resultados"]["En Desacuerdo"]}] });
        Object.assign(this, { neutral: [{name: res.respuesta[dimension][1]["pregunta"].slice(3), value: res.respuesta[dimension][1]["resultados"]["Neutral"]}, {name: res.respuesta[dimension][2]["pregunta"].slice(3), value: res.respuesta[dimension][2]["resultados"]["Neutral"]}, {name: res.respuesta[dimension][3]["pregunta"].slice(3), value: res.respuesta[dimension][3]["resultados"]["Neutral"]}, {name: res.respuesta[dimension][4]["pregunta"].slice(3), value: res.respuesta[dimension][4]["resultados"]["Neutral"]}] });
        Object.assign(this, { de_acuerdo: [{name: res.respuesta[dimension][1]["pregunta"].slice(3), value: res.respuesta[dimension][1]["resultados"]["De Acuerdo"]}, {name: res.respuesta[dimension][2]["pregunta"].slice(3), value: res.respuesta[dimension][2]["resultados"]["De Acuerdo"]}, {name: res.respuesta[dimension][3]["pregunta"].slice(3), value: res.respuesta[dimension][3]["resultados"]["De Acuerdo"]}, {name: res.respuesta[dimension][4]["pregunta"].slice(3), value: res.respuesta[dimension][4]["resultados"]["De Acuerdo"]}] });
        Object.assign(this, { muy_acuerdo: [{name: res.respuesta[dimension][1]["pregunta"].slice(3), value: res.respuesta[dimension][1]["resultados"]["Muy de Acuerdo"]}, {name: res.respuesta[dimension][2]["pregunta"].slice(3), value: res.respuesta[dimension][2]["resultados"]["Muy de Acuerdo"]}, {name: res.respuesta[dimension][3]["pregunta"].slice(3), value: res.respuesta[dimension][3]["resultados"]["Muy de Acuerdo"]}, {name: res.respuesta[dimension][4]["pregunta"].slice(3), value: res.respuesta[dimension][4]["resultados"]["Muy de Acuerdo"]}] });
      }
    );
  }

  modalPregunta(numero, descripcion){
    this.numero_pregunta = numero;
    this.nombre_pregunta = descripcion;
    var dimension = "Fiabilidad";
    this._preguntasService.listarRespuestaPreguntas().subscribe(
      res => {
        Object.assign(this, { pregunta: [{name: "Muy en desacuerdo", value: res.respuesta[dimension][numero]["resultados"]["Muy en Desacuerdo"]}, {name: "En desacuerdo", value: res.respuesta[dimension][numero]["resultados"]["En Desacuerdo"]}, {name: "Neutral", value: res.respuesta[dimension][numero]["resultados"]["Neutral"]}, {name: "De acuerdo", value: res.respuesta[dimension][numero]["resultados"]["De Acuerdo"]}, {name: "Muy de acuerdo", value: res.respuesta[dimension][numero]["resultados"]["Muy de Acuerdo"]}] });
      }
    );
  }

  verGrafica(nivel){
    this.estado = false;
    var id_pregunta = (this.numero_pregunta+0);
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
