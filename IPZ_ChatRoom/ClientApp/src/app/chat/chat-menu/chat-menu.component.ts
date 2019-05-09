import { Component, OnInit, OnDestroy } from '@angular/core';
import * as signalR from "@aspnet/signalr";
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'src/app/shared/services/message/message.service';
import { Message, MessageViewModel } from '../../shared';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-chat-menu',
  templateUrl: './chat-menu.component.html',
  styleUrls: ['./chat-menu.component.scss']
})
export class ChatMenuComponent implements OnInit, OnDestroy {

  /**
   *
   */
  constructor() {

  }
  ngOnDestroy(): void {
  }

  ngOnInit(): void {
  }


}
