import { Component, OnInit } from '@angular/core';
import { AppStateWithIngreso } from '../ingreso-egreso.reducer';
import { Store } from '@ngrx/store';
import { IngresoEgreso } from '../../model/ingreso-egreso.model';
import { CommonModule } from '@angular/common';
// import { MultiDataSet, Label } from 'ng2-charts';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-estadistica',
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './estadistica.component.html',
  styles: ``
})
export class EstadisticaComponent implements OnInit {
  ingresos:number = 0;
  egresos :number = 0;

  totalEgresos :number = 0;
  totalIngresos:number = 0;

  // public doughnutChartLabels = ['Ingresos', 'Egresos']; // : Label[]
  // public doughnutChartData: any = [[]]; // : MultiDataSet

  public doughnutChartLabels: string[] =  ['Ingresos', 'Egresos']
  // public doughnutChartData = [
  //  [350, 450]
  // ];

  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: [] },
    ],
  };

  public doughnutChartType: ChartType = 'doughnut';

  constructor( private store: Store<AppStateWithIngreso> ) {}

  ngOnInit() {
    this.store.select('ingresosEgresos')
      .subscribe( ({ items }) => this.generarEstadistica( items ) );
  }

  generarEstadistica( items: IngresoEgreso[] ) {

    this.totalEgresos  = 0;
    this.totalIngresos = 0;
    this.ingresos = 0;
    this.egresos  = 0

    for (const item of items ) {
      if ( item.tipo === 'ingreso' ) {
        this.totalIngresos += item.monto;
        this.ingresos ++;
      } else {
        this.totalEgresos += item.monto;
        this.egresos ++;
      }
    }

    this.doughnutChartData.datasets = [
      { data: [this.totalIngresos, this.totalEgresos] },
    ];

  }

}
