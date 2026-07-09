import { Component, inject, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NotificationService } from '../../../core/services/notification.service';
import { AuthService } from '../../../core/services/auth.service';
import { TranslatePipe } from '../../../core/i18n/translate.pipe';

@Component({
  selector: 'app-notifications-panel',
  standalone: true,
  imports: [CommonModule, DatePipe, MatIconModule, MatButtonModule, TranslatePipe],
  template: `
    <div class="notif-panel">
      <div class="notif-panel__header">
        <h3>Notifications</h3>
        <button mat-button color="primary" (click)="markAll()">Tout marquer comme lu</button>
      </div>
      <div class="notif-list">
        @for (n of svc.notifications(); track n.id) {
          <div class="notif-item" [class.notif-item--unread]="!n.lue">
            <div class="notif-icon" [class]="'notif-icon--' + n.type.toLowerCase()">
              <mat-icon>{{ svc.getIcon(n.type) }}</mat-icon>
            </div>
            <div class="notif-body">
              <p class="notif-titre">{{ n.titre }}</p>
              <p class="notif-message">{{ n.message }}</p>
              <p class="notif-date">{{ n.createdAt | date:'dd/MM/yyyy HH:mm' }}</p>
            </div>
            @if (!n.lue) { <span class="notif-dot"></span> }
          </div>
        } @empty {
          <div class="notif-empty">
            <mat-icon>notifications_none</mat-icon>
            <p>Aucune notification</p>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .notif-panel { width: 360px; max-height: 480px; overflow-y: auto; }
    .notif-panel__header { display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; border-bottom: 1px solid #e0e0e0; h3 { margin: 0; font-size: 0.95rem; font-weight: 600; } }
    .notif-list { }
    .notif-item { display: flex; align-items: flex-start; gap: 12px; padding: 14px 16px; border-bottom: 1px solid #f5f5f5; position: relative; transition: background .15s;
      &:hover { background: #fafafa; }
      &--unread { background: #F8FAFC; }
    }
    .notif-icon { width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;
      mat-icon { font-size: 18px; }
      &--echeance { background: #fff3e0; mat-icon { color: #e65100; } }
      &--virement { background: #FFF3E0; mat-icon { color: #F57F17; } }
      &--info     { background: #F1F5F9; mat-icon { color: #0F172A; } }
      &--alerte   { background: #ffebee; mat-icon { color: #c62828; } }
    }
    .notif-body { flex: 1; min-width: 0; }
    .notif-titre { margin: 0 0 3px; font-size: 0.85rem; font-weight: 600; color: #212121; }
    .notif-message { margin: 0 0 4px; font-size: 0.78rem; color: #616161; line-height: 1.4; }
    .notif-date { margin: 0; font-size: 0.7rem; color: #9e9e9e; }
    .notif-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--color-primary); flex-shrink: 0; margin-top: 4px; }
    .notif-empty { display: flex; flex-direction: column; align-items: center; padding: 32px; color: #9e9e9e; gap: 8px;
      mat-icon { font-size: 36px; } p { margin: 0; font-size: 0.875rem; } }
  `]
})
export class NotificationsPanelComponent {
  svc = inject(NotificationService);
  private auth = inject(AuthService);

  markAll() {
    const id = this.auth.currentUser()?.membreId;
    if (id) this.svc.markAllRead(id).subscribe();
  }
}
