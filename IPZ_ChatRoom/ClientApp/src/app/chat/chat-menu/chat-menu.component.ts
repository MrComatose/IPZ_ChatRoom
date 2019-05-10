import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { UserViewModel } from 'src/app/core';
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

  constructor() {

  }
  ngOnDestroy(): void {
  }

  ngOnInit(): void {
  }


}
