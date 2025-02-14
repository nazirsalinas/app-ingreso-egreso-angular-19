import { ApplicationConfig, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

//Firebase
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getStorage, provideStorage } from '@angular/fire/storage';

import {
  provideCharts,
  withDefaultRegisterables,
  } from 'ng2-charts';

// NGRX
import { appReducers } from './app.reducer';


export const appConfig: ApplicationConfig = {
  providers: [
    provideStore(appReducers), // Proveer el store
    // provideStore(appReducers), // Proveer el store

    provideEffects(), // Proveer efectos
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    // !environment.production ? provideStoreDevtools() : [], // Proveer devtools si no está en producción

    provideStoreDevtools({
      maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
      connectInZone: true // If set to true, the connection is established within the Angular zone
    }), provideFirebaseApp(() => initializeApp({ projectId: "ingreso-egreso-app-ben", appId: "1:898746740542:web:25728175c60b3c50f4066f", databaseURL: "https://ingreso-egreso-app-ben-default-rtdb.firebaseio.com", storageBucket: "ingreso-egreso-app-ben.firebasestorage.app", apiKey: "AIzaSyB2ahty86V3MBla8L1pvYWbOE3gO_1ahcI", authDomain: "ingreso-egreso-app-ben.firebaseapp.com", messagingSenderId: "898746740542", measurementId: "G-S6YJ38EQPX" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), provideDatabase(() => getDatabase()), provideStorage(() => getStorage()),
    // provideClientHydration(withEventReplay()), provideFirebaseApp(() => initializeApp({ projectId: "ingreso-egreso-app-ben", appId: "1:898746740542:web:25728175c60b3c50f4066f", databaseURL: "https://ingreso-egreso-app-ben-default-rtdb.firebaseio.com", storageBucket: "ingreso-egreso-app-ben.firebasestorage.app", apiKey: "AIzaSyB2ahty86V3MBla8L1pvYWbOE3gO_1ahcI", authDomain: "ingreso-egreso-app-ben.firebaseapp.com", messagingSenderId: "898746740542", measurementId: "G-S6YJ38EQPX" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), provideDatabase(() => getDatabase()), provideFirebaseApp(() => initializeApp({ projectId: "ingreso-egreso-app-ben", appId: "1:898746740542:web:25728175c60b3c50f4066f", databaseURL: "https://ingreso-egreso-app-ben-default-rtdb.firebaseio.com", storageBucket: "ingreso-egreso-app-ben.firebasestorage.app", apiKey: "AIzaSyB2ahty86V3MBla8L1pvYWbOE3gO_1ahcI", authDomain: "ingreso-egreso-app-ben.firebaseapp.com", messagingSenderId: "898746740542", measurementId: "G-S6YJ38EQPX" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), provideDatabase(() => getDatabase()), provideStorage(() => getStorage())
    provideCharts(withDefaultRegisterables())
  ]
};

