import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavbarComponent } from "../shared/navbar/navbar.component";
import { SidebarComponent } from "../shared/sidebar/sidebar.component";
import { FooterComponent } from "../shared/footer/footer.component";
import { RouterOutlet } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import * as ingresoEgresoActions from '../ingreso-egreso/ingreso-egreso.actions';


@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet, NavbarComponent, SidebarComponent, FooterComponent],
  templateUrl: './dashboard.component.html',
  styles: ``
})
export class DashboardComponent implements OnInit, OnDestroy {

  userSubs!: Subscription;
  ingresosSubs!: Subscription;

  constructor( private store: Store<AppState>,
               private ingresoEgresoService: IngresoEgresoService ) { }

  ngOnInit() {

    this.userSubs = this.store.select('user')
      .pipe(
        filter( auth => auth.user != null )
      )
      .subscribe( ({user}) => {
        if(!user) { return }
        this.ingresosSubs = this.ingresoEgresoService.initIngresosEgresosListener( user.uid )
          .subscribe( ingresosEgresosFB => {
            console.log('ingresosEgresosFB', ingresosEgresosFB)
            this.store.dispatch( ingresoEgresoActions.setItems({ items: ingresosEgresosFB }) )

          })
      });

  }

  ngOnDestroy(){
    this.ingresosSubs?.unsubscribe();
    this.userSubs?.unsubscribe();
  }

}
