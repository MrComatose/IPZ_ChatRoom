import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { MessageViewModel } from 'src/app/core';


@Component({
  selector: 'app-chat-container',
  templateUrl: './chat-container.component.html',
  styleUrls: ['./chat-container.component.scss']
})
export class ChatContainerComponent implements OnInit {


  @Input()
  public message: string;

  @ViewChild('chat')
  public chat: ElementRef<HTMLElement>;

  @Input()
  public set msgs(v) {
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
    this.chat.nativeElement.scrollTop =  this.chat.nativeElement.scrollHeight ;
  }
}
