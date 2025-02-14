import { inject, Injectable } from '@angular/core';
import { doc, Firestore, setDoc } from '@angular/fire/firestore';
import {  Auth,
          authState,
          createUserWithEmailAndPassword,
          signInWithEmailAndPassword,
          updateProfile,
          User } from '@angular/fire/auth';
import { Usuario } from '../model/usuario.model';
import { map, Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as authActions from '../auth/auth.actions';
import * as ingresoEgresoActions from '../ingreso-egreso/ingreso-egreso.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  auth: Auth = inject(Auth);
  userLogin!: Observable<User | null>;
  firestore: Firestore = inject(Firestore);
  private _user!: Usuario;
  // private authSubscription: Subscription;

  get user() {
    return this._user;
  }


  constructor(
    // public auth: AngularFireAuth,
    // public auth: Auth = inject(Auth),
    // private firestore: Firestore,
    private store: Store<AppState>
  ) {
    // this.user = authState(this.auth);
  }

  initAuthListener() {

    // authState.subscribe( fuser => {
    //   if ( fuser ) {
    //     // existe
    //     this.userSubscription = this.firestore.doc(`${ fuser.uid }/usuario`).valueChanges()
    //       .subscribe( (firestoreUser: any) => {


    //         const user = Usuario.fromFirebase( firestoreUser );
    //         this._user = user;
    //         this.store.dispatch( authActions.setUser({ user }) );

    //       })

    //   } else {
    //     // no existe
    //     this._user = null;
    //     this.userSubscription?.unsubscribe();
    //     this.store.dispatch( authActions.unSetUser() );
    //     this.store.dispatch( ingresoEgresoActions.unSetItems() );
    //   }

    // });

    this.userLogin = authState(this.auth);
    this.userLogin.subscribe(user => {
       if (user) {
          console.log('User is logged in:', user.email);
          // user is logged in
          const _newUSer: Usuario = {
            uid: user.uid,
            nombre: user.displayName,
            email: user.email,
          }
          this._user = Usuario.fromFirebase(_newUSer);
          console.log('newUser', this._user)
          this.store.dispatch( authActions.setUser({ user: _newUSer }) );
          // this._user = user;
          // this.store.dispatch( authActions.setUser({ user.uid, user.displayName, user }) );
       } else {
         console.log('User is logged out');
         // user is logged out
        this.store.dispatch( authActions.unSetUser() );
        this.store.dispatch( ingresoEgresoActions.unSetItems() );
       }
     });


  }

  crearUsuario( nombre:string, email: string, password: string ) {

    console.log({ nombre, email, password });
    return createUserWithEmailAndPassword( this.auth, email, password )
      .then(({ user }) => {

        // if (user) {
        //   // Actualizar el perfil del usuario con el nombre
        //   updateProfile(user, { displayName: nombre });

        //   // Guardar información adicional en Firestore
        //   const userDocRef = doc(this.firestore, `usuarios/${user.uid}`);
        //   return setDoc(userDocRef, {
        //     uid: user.uid,
        //     nombre: nombre,
        //     email: email
        //   });
        // }

        const newUser = {
          uid: user.uid,
          nombre: nombre,
          email: user.email
        };

        updateProfile(user, { displayName: nombre });

        console.log('newUser', newUser)
        const userDocRef = doc(this.firestore, `${user.uid}/usuario`); // Use doc as function
        return setDoc(userDocRef, newUser); // Use setDoc to set the document

        // return this.firestore.doc(`${ user.uid }/usuario`).set({ ...newUser });
      }
    )
  }


  loginUsuario( email:string, password:string) {
    return signInWithEmailAndPassword( this.auth, email, password );
  }

  logout() {
    return this.auth.signOut();
  }

  isAuth() {
    return authState(this.auth).pipe(
      map( fbUser => fbUser != null)
    )
    // return authState.pipe(
    //   map( fbUser => fbUser != null )
    // );
  }
}
