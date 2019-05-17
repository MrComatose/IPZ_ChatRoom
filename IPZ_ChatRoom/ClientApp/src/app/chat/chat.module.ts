import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatLayoutComponent } from './chat-layout/chat-layout.component';
import { ChatContainerComponent } from './chat-container/chat-container.component';
import { ChatVotingComponent } from './chat-voting/chat-voting.component';
import { RouterModule, ActivatedRouteSnapshot } from '@angular/router';
import { AccountResolver, AuthHttpClient, AppHttpClient } from '../core';
import { SharedModule } from '../shared/shared.module';
import { MessageService } from '../core/Services/message.service';
import { FormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ChatMenuComponent } from './chat-menu/chat-menu.component';
import { MatListModule } from '@angular/material/list';
import { UserService } from '../core/Services/user.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ChatService } from '../core/Services/chat.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { AddChatDialogComponent } from './add-chat-dialog/add-chat-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
@NgModule({
  declarations: [
    ChatLayoutComponent,
    ChatContainerComponent,
    ChatVotingComponent,
    ChatMenuComponent,
    AddChatDialogComponent
  ],
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatButtonModule,
    SharedModule,
    CommonModule,
    MatListModule,
    FormsModule,
    MatSidenavModule,
    MatToolbarModule,
    RouterModule.forChild(
      [
        { path: '', component: ChatLayoutComponent, resolve: { user: AccountResolver } },
        { path: 'chat-layout', component: ChatLayoutComponent, resolve: { user: AccountResolver } }
      ]
    )
  ],
  exports: [RouterModule],
  entryComponents: [ChatLayoutComponent, AddChatDialogComponent],
  providers: [AppHttpClient, AuthHttpClient, AccountResolver, MessageService, UserService, ChatService]
})
export class ChatModule { }
