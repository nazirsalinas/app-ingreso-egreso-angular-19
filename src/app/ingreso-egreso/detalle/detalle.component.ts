import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IngresoEgreso } from '../../model/ingreso-egreso.model';
import { Subscription } from 'rxjs';
import { AppStateWithIngreso } from '../ingreso-egreso.reducer';
import { Store } from '@ngrx/store';
import { IngresoEgresoService } from '../../services/ingreso-egreso.service';
import Swal from 'sweetalert2';
import { OrdenIngresoPipe } from '../../pipes/orden-ingreso.pipe';

@Component({
  selector: 'app-detalle',
  imports: [CommonModule, RouterModule, ReactiveFormsModule, OrdenIngresoPipe],
  templateUrl: './detalle.component.html',
  styleUrl: './detalle.component.scss'
})
export class DetalleComponent implements OnInit, OnDestroy {
  ingresosEgresos: IngresoEgreso[] = []
  ingresosSubs!: Subscription;

  constructor( private store: Store<AppStateWithIngreso>,
               private ingresoEgresoService: IngresoEgresoService ) { }

  ngOnInit() {
    this.ingresosSubs = this.store.select('ingresosEgresos')
      .subscribe( ({ items }) => {
        console.log('items', items)
        this.ingresosEgresos = items
      });
  }
  ngOnDestroy(){
    this.ingresosSubs.unsubscribe();
  }


  borrar( uid: string | undefined ) {
    if ( uid === undefined ) { return; }

    this.ingresoEgresoService.borrarIngresoEgreso( uid )
      .then( ()   => Swal.fire('Borrado', 'Item borrado' , 'success') )
      .catch( err => Swal.fire('Error', err.message , 'error') );
  }

}
