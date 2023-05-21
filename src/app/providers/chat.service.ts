import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Mensaje } from '../interfaces/mensaje.interface';
import { map } from 'rxjs/operators';

import { GoogleAuthProvider } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private itemsCollection: AngularFirestoreCollection<Mensaje>;
  public chats: Mensaje[] = [];
  public usuario: any = {}

  constructor(private afs: AngularFirestore, public afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      console.log('Estado del usuario: ', user);

      if(!user){
        return;
      }

      this.usuario.nombre = user.displayName;
      this.usuario.uid = user.uid;
    })
  }

  GoogleAuth() {
    return this.AuthLogin(new GoogleAuthProvider());
  }

  AuthLogin(provider) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        console.log('You have been successfully logged in');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  signOut(){
    return this.afAuth.signOut().then(() => {
      console.log("Deslogeado");
      this.usuario = {};
    })
  }

  cargarMensajes() {
    this.itemsCollection = this.afs.collection<Mensaje>('chats', (ref) =>
      ref.orderBy('fecha', 'desc').limit(5)
    );

    return this.itemsCollection.valueChanges().pipe(
      map((mensajes: Mensaje[]) => {
        console.log(mensajes);

        this.chats = [];

        for (let mensaje of mensajes) {
          this.chats.unshift(mensaje);
        }

        // this.chats = mensajes;
      })
    );
  }

  agregarMensaje(texto: string) {
    let mensaje: Mensaje = {
      nombre: this.usuario.nombre,
      mensaje: texto,
      fecha: new Date().getTime(),
      uid: this.usuario.uid
    };

    return this.itemsCollection.add(mensaje);
  }
}
