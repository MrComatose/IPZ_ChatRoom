import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AccountResolver } from './Resolvers/account.resolver';
import { MessageService } from './Services/message.service';
import { UserService } from './Services/user.service';
@NgModule({
  declarations: [],
  imports: [BrowserModule, HttpClientModule],
  providers: [HttpClient, AccountResolver, MessageService, UserService],
  exports: [],
  bootstrap: []
})
export class CoreModule {

}
