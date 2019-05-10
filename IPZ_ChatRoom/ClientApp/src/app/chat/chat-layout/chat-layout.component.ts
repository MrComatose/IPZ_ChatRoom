import { Component, OnInit, OnDestroy } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { ActivatedRoute } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { MessageViewModel, UserViewModel } from 'src/app/core';
import { MessageService } from 'src/app/core/Services/message.service';
import { UserService } from 'src/app/core/Services/user.service';
@Component({
  selector: 'app-chat-layout',
  templateUrl: './chat-layout.component.html',
  styleUrls: ['./chat-layout.component.scss']
})
export class ChatLayoutComponent implements OnInit, OnDestroy {
  title = 'ClientApp';
  msgs: MessageViewModel[] = [];
  usersOnline: UserViewModel[];
  usersOffline: UserViewModel[];
  user: any;
  private connection: signalR.HubConnection;
  public opened: boolean;
  constructor(
    private route: ActivatedRoute,
    private mesageService: MessageService,
    private toastr: ToastrService,
    private userService: UserService
  ) {
    // window.onfocus = () => { this.chatInit(); };
  }
  public useEvents = () => {
    this.connection.on('receivemessage', (data: MessageViewModel) => {
      this.msgs = [...this.msgs, data];
    });
    this.connection.on('connection', (user) => {
      if (user.isOnline) {
        this.usersOnline.push(user);
        this.usersOnline = this.usersOnline
          .filter((v, i) => this.usersOnline.indexOf(this.usersOnline.find(x => x.userName === v.userName)) === i);
        this.usersOffline = this.usersOffline.filter((v, i) => v !== user);
      } else {
       
        this.usersOnline = this.usersOnline.filter((v, i) => v !== user);
      }
    });
  }

  public sendData = (str: string) => {
    this.connection.invoke('SendMessage', {
      id: 0,
      text: str,
      date: new Date(Date.now()),
      user: this.user,
      userId: this.user.id,
      imageUrl: ''
    });
  }

  ngOnDestroy(): void {

    window.focus = null;
    this.connection.invoke('Disconnect').then(() => {
      this.connection.stop();

    });

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
    if (this.connection) { this.connection.stop(); this.connection = null; }
    console.log('Chat Initialization');
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl('/chat', { accessTokenFactory: () => localStorage.getItem('token') })
      .build();
    this.connection
      .start()
      .then(() => {
        this.connection.invoke('Connect');
        this.userService.getUsers().subscribe(r => {
          this.usersOnline = r.filter(x => x.isOnline);
          this.usersOffline = r.filter(x => x.isOnline);
        });
        console.log('Connection started');
      })
      .catch(err => console.log('Error while starting connection: ' + err));
    this.useEvents();
    this.connection.
      onclose(
        () => {
          this.connection.invoke('Disconnect');
        });
  }
}
