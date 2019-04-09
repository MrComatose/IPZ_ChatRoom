import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { Message } from 'src/app/shared';

@Component({
  selector: 'app-chat-container',
  templateUrl: './chat-container.component.html',
  styleUrls: ['./chat-container.component.scss']
})
export class ChatContainerComponent implements OnInit, AfterViewChecked {


  @Input()
  message: string;

  @ViewChild('chat')
  chat: ElementRef;

  @Input()
  public set msgs(v) {
    this._msgs = v;
    this.scroll();
  }

  public get msgs() {
    return this._msgs;
  }
  private _msgs: Message[];

  @Input()
  public user;
  @Output()
  public send: EventEmitter<any> = new EventEmitter();
  constructor(

  ) { 
    
  }

  ngOnInit() {
    this.scroll();
  }


  ngAfterViewChecked(): void {
    this.scroll();
  }


  sendMessage() {
    if (this.message) {
      this.send.emit(this.message);
    }
    this.message = '';
  }
  scroll() {
    this.chat.nativeElement.scrollTop = this.chat.nativeElement.scrollHeight;
  }
}
