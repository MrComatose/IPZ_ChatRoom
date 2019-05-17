import { AuthHttpClient } from "../AuthHttpClient/auth-http-client";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AccountResolver implements Resolve<any> {
  constructor(private backend: AuthHttpClient) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    return this.backend.get<any>('api/auth').pipe(map(x => ({ ...x.user, roles: x.roles })));
  }
}