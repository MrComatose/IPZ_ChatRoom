import { Injectable } from '@angular/core';
import { AuthHttpClient, Chat } from '..';
import { Observable } from 'rxjs';

@Injectable()
export class ChatService {

   /**
    *
    */
   constructor(private httpClient: AuthHttpClient) {
   }

   public createChat(name: string): Observable<void> {
      return this.httpClient.post(`api/chat?name=${name}`, {});
   }
   public getChats(): Observable<Chat[]> {
      return this.httpClient.get('api/chat');
   }

}