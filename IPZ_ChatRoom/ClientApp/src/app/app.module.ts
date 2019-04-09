import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { RouterModule } from "@angular/router";
import { AppRoutes } from "./app.routing";
import { ChatModule } from "./chat/chat.module";
import { AuthGuardService } from "./core";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule,MatMenuModule, MatIconModule, MatToolbarModule} from '@angular/material';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { TokenInterceptor } from './auth/token.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [
    ToastrModule.forRoot({
      progressBar: true,
      closeButton: true
  }),
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule, MatCheckboxModule,MatMenuModule,MatIconModule,MatToolbarModule,
    BrowserModule,
    RouterModule.forRoot(AppRoutes)
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
},AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule {}
