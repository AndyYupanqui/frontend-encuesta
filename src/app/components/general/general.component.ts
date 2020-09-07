import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { GeneralModel } from '../../models/general.model';
import { GeneralService } from '../../services/general.service';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css'],
  providers: [GeneralService]
})
export class GeneralComponent implements OnInit {
  displayedColumns: string[] = ['numero', 'dimension', 'muy_desacuerdo', 'en_desacuerdo', 'neutral', 'de_acuerdo', 'muy_acuerdo'];
  dataSource: MatTableDataSource<GeneralModel>;
  cantidad_encuestados: number;
  dimension = ["Capacidad de Respuesta", "Empatía", "Fiabilidad", "Seguridad", "Tangibilidad"];
  resultado_dimension = [];

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
  xAxisLabel = 'Niveles de Satisfacción';
  showYAxisLabel = true;
  yAxisLabel = 'Cantidad';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#0000FF', '#AAAAAA']
  };

  constructor(
    private _generalService: GeneralService,
  ) { }

  ngOnInit() {
    this.listarDimensiones();
  }

  listarDimensiones() {
    this._generalService.listarDimensiones().subscribe(
      res => {
        for(var i=0; i<this.dimension.length; i++){
          this.resultado_dimension[i] = {numero: (i+1), dimension: this.dimension[i], muy_desacuerdo: res.respuesta[this.dimension[i]]["Muy en Desacuerdo"], en_desacuerdo: res.respuesta[this.dimension[i]]["En Desacuerdo"], neutral: res.respuesta[this.dimension[i]]["Neutral"], de_acuerdo: res.respuesta[this.dimension[i]]["De Acuerdo"], muy_acuerdo: res.respuesta[this.dimension[i]]["Muy de Acuerdo"]};
        }

        // TABLA
        this.dataSource = new MatTableDataSource(this.resultado_dimension);

        // GRÁFICAS
        Object.assign(this, { capacidad_respuesta: [{name: "Muy en desacuerdo", value: this.resultado_dimension[0]["muy_desacuerdo"]}, {name: "En desacuerdo", value: this.resultado_dimension[0]["en_desacuerdo"]}, {name: "Neutral", value: this.resultado_dimension[0]["neutral"]}, {name: "De acuerdo", value: this.resultado_dimension[0]["de_acuerdo"]}, {name: "Muy de acuerdo", value: this.resultado_dimension[0]["muy_acuerdo"]}] });
        Object.assign(this, { empatia: [{name: "Muy en desacuerdo", value: this.resultado_dimension[1]["muy_desacuerdo"]}, {name: "En desacuerdo", value: this.resultado_dimension[1]["en_desacuerdo"]}, {name: "Neutral", value: this.resultado_dimension[1]["neutral"]}, {name: "De acuerdo", value: this.resultado_dimension[1]["de_acuerdo"]}, {name: "Muy de acuerdo", value: this.resultado_dimension[1]["muy_acuerdo"]}] });
        Object.assign(this, { fiabilidad: [{name: "Muy en desacuerdo", value: this.resultado_dimension[2]["muy_desacuerdo"]}, {name: "En desacuerdo", value: this.resultado_dimension[2]["en_desacuerdo"]}, {name: "Neutral", value: this.resultado_dimension[2]["neutral"]}, {name: "De acuerdo", value: this.resultado_dimension[2]["de_acuerdo"]}, {name: "Muy de acuerdo", value: this.resultado_dimension[2]["muy_acuerdo"]}] });
        Object.assign(this, { seguridad: [{name: "Muy en desacuerdo", value: this.resultado_dimension[3]["muy_desacuerdo"]}, {name: "En desacuerdo", value: this.resultado_dimension[3]["en_desacuerdo"]}, {name: "Neutral", value: this.resultado_dimension[3]["neutral"]}, {name: "De acuerdo", value: this.resultado_dimension[3]["de_acuerdo"]}, {name: "Muy de acuerdo", value: this.resultado_dimension[3]["muy_acuerdo"]}] });
        Object.assign(this, { tangibilidad: [{name: "Muy en desacuerdo", value: this.resultado_dimension[4]["muy_desacuerdo"]}, {name: "En desacuerdo", value: this.resultado_dimension[4]["en_desacuerdo"]}, {name: "Neutral", value: this.resultado_dimension[4]["neutral"]}, {name: "De acuerdo", value: this.resultado_dimension[4]["de_acuerdo"]}, {name: "Muy de acuerdo", value: this.resultado_dimension[4]["muy_acuerdo"]}] });
      },
      error => {
        console.log(error);
      }
    );

    this._generalService.cantidadEncuestados().subscribe(
      res => {
        this.cantidad_encuestados = res.respuesta["cantidad encuestados"];
      }
    )
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

  onSelect1(event) {
    //console.log(event);
  }

}
