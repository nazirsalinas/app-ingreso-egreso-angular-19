import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styles: ``
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  cargando: boolean = false;

  constructor( private fb: FormBuilder,
    private authService: AuthService,
    // private store: Store<AppState>,
    private router: Router ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required ],
    });
  }

  login() {

    if ( this.loginForm.invalid ) { return; }

    // this.store.dispatch( ui.isLoading() );


    Swal.fire({
      title: "Espere por favor",
      didOpen: () => {
        Swal.showLoading();
      },
    })

    const { email, password } = this.loginForm.value;

    this.authService.loginUsuario( email, password )
      .then( credenciales => {
        console.log(credenciales);
        Swal.close();
        // this.store.dispatch( ui.stopLoading() );
        this.router.navigate(['/']);
      })
      .catch( err => {
        // this.store.dispatch( ui.stopLoading() );
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message
        })
      });

  }
}
