import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { IngresoEgreso } from '../model/ingreso-egreso.model';

import { AuthService } from './auth.service';

import { Auth } from '@angular/fire/auth';
import { addDoc, collection, deleteDoc, doc, Firestore, onSnapshot } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

    auth: Auth = inject(Auth);
    // userLogin!: Observable<User | null>;
    // user!: Usuario;
    firestore: Firestore = inject(Firestore);

  constructor(
                // private firestore: AngularFirestore,
               private authService: AuthService ) { }

  crearIngresoEgreso( ingresoEgreso: IngresoEgreso ) {
    const uid = this.authService.user.uid;
    console.log('UID', uid)

    delete ingresoEgreso.uid;

    const userDocRef = doc(this.firestore, `${uid}/ingresos-egresos`);
    const itemsCollectionRef = collection(userDocRef, 'items');

    return addDoc(itemsCollectionRef, {...ingresoEgreso});


    // return doc(this.firestore,`${ uid }/ingresos-egresos`)
    //     .collection('items')
    //     .add({ ...ingresoEgreso });

  }

  // initIngresosEgresosListener(uid: string) {

  //   return this.firestore.collection(`${ uid }/ingresos-egresos/items`)
  //     .snapshotChanges()
  //     .pipe(
  //       map( snapshot => snapshot.map( doc => ({
  //             uid: doc.payload.doc.id,
  //             ...doc.payload.doc.data() as any
  //           })
  //         )
  //       )
  //     );
  // }

  initIngresosEgresosListener(uid: string): Observable<any> {
    const userDocRef = doc(this.firestore, `${uid}/ingresos-egresos`);
    const itemsCollectionRef = collection(userDocRef, 'items');

    return new Observable(subscriber => {
      const unsubscribe = onSnapshot(itemsCollectionRef,
        snapshot => {
          subscriber.next(snapshot.docs.map(doc => ({
            uid: doc.id,
            ...doc.data()
          })));
        },
        error => subscriber.error(error)
      );

      return () => unsubscribe();
    }).pipe(
      map(data => data)
    );
  }

  // borrarIngresoEgreso2( uidItem: string ) {

  //   const uid = this.authService.user.uid;
  //   return this.firestore.doc(`${ uid }/ingresos-egresos/items/${ uidItem }`).delete();

  // }

  borrarIngresoEgreso(uidItem: string): Promise<void> {
    const uid = this.authService.user.uid;
    const itemDocRef = doc(this.firestore, `${uid}/ingresos-egresos/items/${uidItem}`);
    return deleteDoc(itemDocRef);
  }

}
