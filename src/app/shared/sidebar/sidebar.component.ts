import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  imports: [RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  nombre: string = '';
  // userSubs!: Subscription;

  constructor(
    // private authService: AuthService,
    private router: Router,
    // private store: Store<AppState>
  ) { }

  ngOnInit() {
    // this.userSubs = this.store.select('user')
    //   .pipe(
    //     filter( ({user}) => user != null )
    //   )
    //   .subscribe( ({ user }) => this.nombre = user.nombre );
  }


  ngOnDestroy() {
    // this.userSubs.unsubscribe();
  }

  logout() {
    // this.authService.logout().then( () => {
    //   this.router.navigate(['/login']);
    // })

  }

}
