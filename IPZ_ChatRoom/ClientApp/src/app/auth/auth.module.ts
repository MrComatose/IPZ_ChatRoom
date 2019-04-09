import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SignInComponent } from "./sign-in/sign-in.component";
import { RouterModule } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AppHttpClient } from '../core';
import { SignUpComponent } from './sign-up/sign-up.component';
@NgModule({
  declarations: [SignInComponent, SignUpComponent],
  imports: [
    FormsModule,
    ToastrModule.forRoot(),
    CommonModule,
    RouterModule.forChild([
      { path: "", component: SignInComponent },
      {path: "sign-up", component: SignUpComponent},
      { path: "sign-in", component: SignInComponent },
    ])
  ], providers: [AppHttpClient, ToastrService],
  entryComponents: [SignInComponent]
})
export class AuthModule {}
