import { Component, OnInit, OnDestroy } from '@angular/core';
import * as signalR from "@aspnet/signalr";
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'src/app/shared/services/message/message.service';
import { Message } from '../../shared';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-chat-layout',
  templateUrl: './chat-layout.component.html',
  styleUrls: ['./chat-layout.component.scss']
})
export class ChatLayoutComponent implements OnInit, OnDestroy {
  title = "ClientApp";
  msgs: Message[] = [];
  user: any;
  private connection: signalR.HubConnection;

  constructor(
    private route: ActivatedRoute,
    private mesageService: MessageService,
    private toastr: ToastrService,
  ) {
    window.onfocus = () => { this.chatInit(); };
  }
  public addTransferChartDataListener = () => {
    this.connection.on("receivemessage", (data: Message) => {
      this.msgs.push(data);
      console.log(data);
    });
  }

  public sendData = (str: string) => {
    this.mesageService.sendMessage(
      {
        id: 0,
        text: str,
        date: new Date(Date.now()),
        user: this.user,
        userId: this.user.id,
        imageUrl: ''
      }
    ).subscribe(r => {

    }, e => {
      this.toastr.error('Cannot send msg');
    });
  }

  ngOnDestroy(): void {
    this.connection.stop();
    window.focus = null;
  }

  ngOnInit() {
    this.mesageService.getMessage().subscribe(e => { this.msgs = e || []; }, e => {
      console.log(e);
      this.toastr.error('Couldnot get messages');
    });
    this.route.data.subscribe(r => { this.user = r.user; });
    this.chatInit();
  }

  chatInit() {
    if (this.connection) { this.connection.stop(); this.connection = null;}
    console.log('Chat Initialization');
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl('/chat')
      .build();
    this.connection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err));
    this.addTransferChartDataListener();
    this.connection.onclose(
      () => this.connection.start()
        .then(() => console.log('Connection started'))
        .catch(err => console.log('Error while starting connection: ' + err))
    );
  }
}
