import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { UserViewModel, Chat } from 'src/app/core';
@Component({
  selector: 'app-chat-menu',
  templateUrl: './chat-menu.component.html',
  styleUrls: ['./chat-menu.component.scss']
})
export class ChatMenuComponent implements OnInit, OnDestroy {

  @Input()
  offline: UserViewModel[];

  @Input()
  online: UserViewModel[];
  @Input()
  chat: Chat;
  @Input()
  chats: Chat[];
  @Output()
  public changeChat: EventEmitter<Chat> = new EventEmitter();

  constructor() {

  }
  ngOnDestroy(): void {
  }

  ngOnInit(): void {
  }
  selectChat(room){
    this.chat = room;
    this.changeChat.emit(room);
  }

}
