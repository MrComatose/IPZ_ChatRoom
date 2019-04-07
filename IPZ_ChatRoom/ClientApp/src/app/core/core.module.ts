import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule, HttpClient } from '@angular/common/http';
@NgModule({
  declarations: [],
  imports: [BrowserModule, HttpClientModule],
  providers: [HttpClient],
  exports: [],
  bootstrap: []
})
export class CoreModule {

}
