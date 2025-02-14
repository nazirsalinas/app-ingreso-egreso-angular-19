import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import * as ui from '../shared/ui.actions';
import { IngresoEgreso } from '../model/ingreso-egreso.model';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-ingreso-egreso',
  imports: [CommonModule, RouterModule, ReactiveFormsModule,],
  templateUrl: './ingreso-egreso.component.html',
  styles: ``
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  ingresoForm! : FormGroup;
  tipo       : string  = 'ingreso';
  cargando   : boolean = false;
  loadingSubs!: Subscription;

  constructor( private fb: FormBuilder,
               private ingresoEgresoService: IngresoEgresoService,
               private store: Store<AppState>) { }

  ngOnInit() {

    this.loadingSubs = this.store.select('ui')
      .subscribe( ({ isLoading }) => this.cargando = isLoading );

    this.ingresoForm = this.fb.group({
      descripcion: ['', Validators.required ],
      monto: ['', Validators.required ],
    });

  }

  ngOnDestroy() {
    this.loadingSubs.unsubscribe();
  }

  guardar() {
    if ( this.ingresoForm.invalid ) { return; }

    this.store.dispatch( ui.isLoading() );

    const { descripcion, monto } = this.ingresoForm.value;

    const ingresoEgreso = new IngresoEgreso(descripcion, monto, this.tipo);

    console.log('ingresoEgreso', ingresoEgreso)

    this.ingresoEgresoService.crearIngresoEgreso( ingresoEgreso )
      .then( () => {
        this.ingresoForm.reset();
        this.store.dispatch( ui.stopLoading() );
        Swal.fire('Registro creado', descripcion , 'success');
      })
      .catch( err => {
        this.store.dispatch( ui.stopLoading() );
        Swal.fire('Error', err.message , 'error');
      });
  }

}
