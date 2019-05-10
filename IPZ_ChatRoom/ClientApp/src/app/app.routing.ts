import { Routes, CanActivate } from '@angular/router';
import { from } from 'rxjs';
import { AuthGuardService as AuthGuard } from './core/AuthGuard/auth.guard';
import { ChatLayoutComponent } from './chat/chat-layout/chat-layout.component';
export const AppRoutes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: './chat/chat.module#ChatModule'
      },
      {
        path: 'chat-room',
        canActivate: [AuthGuard],
        loadChildren: './chat/chat.module#ChatModule'
      }
    ]
  },
  {
    path: 'auth',
    loadChildren: './auth/auth.module#AuthModule'
  }
];
