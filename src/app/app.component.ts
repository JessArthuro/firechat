import { Component } from '@angular/core';
import { ChatService } from './providers/chat.service';
// import { AngularFirestore } from '@angular/fire/compat/firestore';
// import { Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  // chats: Observable<any[]>;
  // constructor(firestore: AngularFirestore) {
  //   this.chats = firestore.collection('chats').valueChanges();
  // }

  constructor(public _cs: ChatService){

  }
}
