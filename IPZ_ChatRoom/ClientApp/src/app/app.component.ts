import { Component, ViewChild } from "@angular/core";
import * as signalR from "@aspnet/signalr";
import { MatMenuTrigger } from '@angular/material';
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  someMethod() {
    this.trigger.openMenu();
  }
}
