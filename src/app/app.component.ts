import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet], //AsyncPipe
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  firestore: Firestore = inject(Firestore);
  title = 'ingresoegresoapp';

  items$: Observable<any[]>;

  constructor( private authService: AuthService ){
    this.authService.initAuthListener();

    const aCollection = collection(this.firestore, 'items')
    this.items$ = collectionData(aCollection);
  }
}
