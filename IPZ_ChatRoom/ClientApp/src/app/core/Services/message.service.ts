import { Injectable } from '@angular/core';
import { AuthHttpClient, Message, MessageViewModel } from '..';
import { Observable } from 'rxjs';

@Injectable()
export class MessageService {

   /**
    *
    */
   constructor(private httpClient: AuthHttpClient) {
   }

   public sendMessage(msg: Message): Observable<void> {
      return this.httpClient.post('api/message', msg);
   }
   public getMessage(): Observable<MessageViewModel[]> {
      return this.httpClient.get('api/message');
   }

}