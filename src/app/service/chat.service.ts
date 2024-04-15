import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { io } from "socket.io-client";


@Injectable({
  providedIn: 'root',
})
export class ChatService {

  public message$: BehaviorSubject<string> = new BehaviorSubject('');
  constructor() {}

  socket = io('http://localhost:5000');

  public sendMessage(message: any) {
    console.log('send ', message)
    this.socket.emit('send', message);
  }

  public getNewMessage = () => {
      this.socket.on('receive', (message) => {
          console.log(message);
      this.message$.next(message);
    });

    return this.message$.asObservable();
  };
}