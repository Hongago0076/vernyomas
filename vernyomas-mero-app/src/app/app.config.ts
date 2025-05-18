import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: "vernyomas-px1elb",
        appId: "1:378354696991:web:48bd57d3aa407ef5a4662a",
        storageBucket: "vernyomas-px1elb.firebasestorage.app",
        apiKey: "AIzaSyCAbOif2LYXZBt4mcWLwVEzIBSfTx5tNoE",
        authDomain: "vernyomas-px1elb.firebaseapp.com",
        messagingSenderId: "378354696991" })),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())]
};
