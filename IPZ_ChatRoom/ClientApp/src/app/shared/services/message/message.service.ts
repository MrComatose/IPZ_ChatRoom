import { Injectable } from '@angular/core';
import { AuthHttpClient } from 'src/app/core';
import { Observable } from 'rxjs';
import { Message, MessageViewModel } from '../../models/message/message';
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