import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatLayoutComponent } from './chat-layout/chat-layout.component';
import { ChatContainerComponent } from './chat-container/chat-container.component';
import { ChatVotingComponent } from './chat-voting/chat-voting.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ChatLayoutComponent, ChatContainerComponent, ChatVotingComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(
      [
        { path: '', component: ChatLayoutComponent}
      ]
    )
  ],
  entryComponents: [ChatLayoutComponent]
})
export class ChatModule { }
