import { inject, Injectable } from '@angular/core';
import { doc, Firestore, setDoc } from '@angular/fire/firestore';
import { Auth, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, User } from '@angular/fire/auth';
import { Usuario } from '../model/usuario.model';
import { map, Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  auth: Auth = inject(Auth);
  user$: Observable<User | null>;
  firestore: Firestore = inject(Firestore);
  // private authSubscription: Subscription;

  constructor(
    // public auth: AngularFireAuth,
    // public auth: Auth = inject(Auth),
    // private firestore: Firestore,
  ) {
    this.user$ = authState(this.auth);
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

    this.user$ = authState(this.auth);
    this.user$.subscribe(user => {
       if (user) {
          console.log('User is logged in:', user);
          // user is logged in
       } else {
         console.log('User is logged out');
         // user is logged out
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
