import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SignInComponent } from "./sign-in/sign-in.component";
import { RouterModule } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AppHttpClient } from '../core';
@NgModule({
  declarations: [SignInComponent],
  imports: [
    FormsModule,
    ToastrModule.forRoot(),
    CommonModule,
    RouterModule.forChild([{ path: "", component: SignInComponent }])
  ], providers: [AppHttpClient, ToastrService],
  entryComponents: [SignInComponent]
})
export class AuthModule {}
