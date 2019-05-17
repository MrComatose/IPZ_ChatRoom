import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { MessageViewModel, Chat } from 'src/app/core';


@Component({
  selector: 'app-chat-container',
  templateUrl: './chat-container.component.html',
  styleUrls: ['./chat-container.component.scss']
})
export class ChatContainerComponent implements OnInit {


  private _chat: Chat;
  public messages =  []
  public get chat(): Chat {
    return this._chat;
  }
  @Input()
  public set chat(v: Chat) {
    if (this._msgs) {
      this.messages = this._msgs.filter(x => x.chatRoomId.toString() === v.id.toString());
    }
    this._chat = v;
  }

  @Input()
  public message: string;

  @ViewChild('chat')
  public chatElement: ElementRef<HTMLElement>;

  @Input()
  public set msgs(v) {
    if(this._chat){
    this.messages = v.filter(x => x.chatRoomId.toString() === this.chat.id.toString());
    }
    this._msgs = v;
    setTimeout(() => this.scroll(), 200);
  }


  public get msgs() {
    return this._msgs;
  }
  private _msgs: MessageViewModel[];

  @Input()
  public user;
  @Output()
  public send: EventEmitter<any> = new EventEmitter();
  constructor(
  ) {

  }

  ngOnInit() {
  }




  sendMessage() {
    if (this.message) {
      this.send.emit(this.message);
    }
    this.message = '';
  }
  scroll() {
    this.chatElement.nativeElement.scrollTop = this.chatElement.nativeElement.scrollHeight;
  }
}
