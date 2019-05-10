import { Injectable } from '@angular/core';
import { AuthHttpClient, UserViewModel } from '..';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {

   /**
    *
    */
   constructor(private httpClient: AuthHttpClient) {
   }

  
   public getUsers(): Observable<UserViewModel[]> {
      return this.httpClient.get('api/user');
   }

}