import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { io } from "socket.io-client";
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment';
import { map, catchError, tap, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ChatService {

  apiUrl: any = environment.apiUrl;
  public message$: BehaviorSubject<string> = new BehaviorSubject('');
  constructor(private http: HttpClient) { }

  // IsSideBarShow: boolean = true;

  extractData(res: any) {
    const body = res;
    return body || {};
  }

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



  getUserMessageById(senderId: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/chat/getMessage/${senderId}`).pipe(map(this.extractData));
  }
  updateMessage(messageId: any, request: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/chat/getMessage/${messageId}`, request).pipe(map(this.extractData));
  }

  deleteMessage(messageId: any): Observable<any> {
    const emptyObject = {}
    return this.http.post(`${this.apiUrl}/chat/getMessage/${messageId}`, emptyObject).pipe(map(this.extractData));
  }

  getAllUser(): Observable<any> { 
    return this.http.get(`${this.apiUrl}/user/auth/getAllUsers`).pipe(map(this.extractData));
  }
}