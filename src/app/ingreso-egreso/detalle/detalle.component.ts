import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-detalle',
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './detalle.component.html',
  styleUrl: './detalle.component.scss'
})
export class DetalleComponent implements OnInit, OnDestroy {
  // ingresosEgresos: IngresoEgreso[] = []
  // ingresosSubs: Subscription;

  ngOnInit() {
    // this.ingresosSubs = this.store.select('ingresosEgresos')
    //   .subscribe( ({ items }) => this.ingresosEgresos = items );
  }

  borrar( uid: string ) {

  }

  ngOnDestroy(){
    // this.ingresosSubs.unsubscribe();
  }
}
