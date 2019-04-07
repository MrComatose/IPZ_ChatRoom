import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
// import { MessageModalComponent } from '../../core';
// import { AddPackageModalComponent } from '../../shared/add-package/add-package-modal/add-package-modal.component';


@Injectable()
export class AuthGuardService implements CanActivate {
    constructor( public router: Router ) { }
    canActivate(route: ActivatedRouteSnapshot): boolean {
        // localStorage.removeItem('token'); just for testing
        if (!this.isAuthenticated()) {
                this.router.navigate(['auth']);
        } else {
            return true;
        }
        return true;
      }
      public isAuthenticated(): boolean {
         if (localStorage.getItem('token')) {
         return true;
         } else {
           return false;
         }
       }
}