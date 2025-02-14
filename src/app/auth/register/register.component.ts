import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2'
import { AppState } from '../../app.reducer';
import { Store } from '@ngrx/store';
import * as ui from '../../shared/ui.actions';


@Component({
  selector: 'app-register',
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styles: ``
})
export class RegisterComponent implements OnInit, OnDestroy {
  registroForm!: FormGroup; // Usa el operador de afirmación no nula
  cargando: boolean = false;
  uiSubscription!: Subscription; // Usa el operador de afirmación no nula

  constructor( private fb: FormBuilder,
      private authService: AuthService,
      private store: Store<AppState>,
      private router: Router
    ) {



  }

  ngOnInit() {
    this.registroForm = this.fb.group({
      nombre:   ['', Validators.required ],
      correo:   ['', [Validators.required, Validators.email ] ],
      password: ['', Validators.required ],
    });
    this.uiSubscription = this.store.select('ui')
      .subscribe( ui => this.cargando = ui.isLoading )
  }


  crearUsuario() {
    console.log(this.registroForm.value)
    console.log(this.registroForm.valid)



    // Swal.fire({
    //   title: "Espere por favor",
    //   didOpen: () => {
    //     Swal.showLoading();
    //   },
    // })
    this.store.dispatch( ui.isLoading () );

    const { nombre, correo, password } = this.registroForm.value;

    this.authService.crearUsuario( nombre, correo, password )
      .then( credenciales => {
        console.log(credenciales);

        // Swal.close();
        this.store.dispatch( ui.stopLoading() );

        this.router.navigate(['/']);
      })
      .catch( err => {
        this.store.dispatch( ui.stopLoading() );
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message
        })
      });
  }

  ngOnDestroy() {
    this.uiSubscription.unsubscribe();
  }




}
