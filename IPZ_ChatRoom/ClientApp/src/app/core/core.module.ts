import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AccountResolver } from './Resolvers/account.resolver';
@NgModule({
  declarations: [],
  imports: [BrowserModule, HttpClientModule],
  providers: [HttpClient, AccountResolver],
  exports: [],
  bootstrap: []
})
export class CoreModule {

}
