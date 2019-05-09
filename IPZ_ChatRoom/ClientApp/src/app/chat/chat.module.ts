import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatLayoutComponent } from './chat-layout/chat-layout.component';
import { ChatContainerComponent } from './chat-container/chat-container.component';
import { ChatVotingComponent } from './chat-voting/chat-voting.component';
import { RouterModule, ActivatedRouteSnapshot } from '@angular/router';
import { AccountResolver, AuthHttpClient, AppHttpClient } from '../core';
import { SharedModule} from '../shared/shared.module';
import { MessageService } from '../shared/services/message/message.service';
import { FormsModule } from '@angular/forms';
import {MatSidenavModule} from '@angular/material/sidenav';
import { ChatMenuComponent } from './chat-menu/chat-menu.component';
@NgModule({
  declarations: [
    ChatLayoutComponent,
     ChatContainerComponent,
     ChatVotingComponent,
    ChatMenuComponent
    ],
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    MatSidenavModule,
    RouterModule.forChild(
      [
        { path: '', component: ChatLayoutComponent, resolve: { user: AccountResolver } },
        { path: 'chat-layout', component: ChatLayoutComponent, resolve: { user: AccountResolver } }
      ]
    )
  ],
  exports: [ RouterModule ],
  entryComponents: [ChatLayoutComponent],
  providers: [AppHttpClient, AuthHttpClient, AccountResolver, MessageService]
})
export class ChatModule { }
