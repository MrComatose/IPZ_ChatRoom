import { Component, OnInit, OnDestroy } from '@angular/core';
import * as signalR from "@aspnet/signalr";
@Component({
  selector: 'app-chat-layout',
  templateUrl: './chat-layout.component.html',
  styleUrls: ['./chat-layout.component.scss']
})
export class ChatLayoutComponent implements OnInit , OnDestroy {
  

  title = "ClientApp";
  msgs = [];
  private connection: signalR.HubConnection;

  constructor() {
  }
  public addTransferChartDataListener = () => {
    this.connection.on("receivemessage", data => {
      this.msgs.push(data);
    });
  }

  public sendData = () => {
    this.connection.invoke("sendmessage", "Га?").catch(r => {
      alert(r);
    });
  }

  ngOnDestroy(): void {
    this.connection.stop();
  }

  ngOnInit() {

    this.connection = new signalR.HubConnectionBuilder()
      .withUrl("/chat")
      .build();
    this.connection
      .start()
      .then(() => console.log("Connection started"))
      .catch(err => console.log("Error while starting connection: " + err));
    this.addTransferChartDataListener();
  }

}
