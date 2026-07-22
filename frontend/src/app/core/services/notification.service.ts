import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface Notification {
  id: number;
  type: 'ECHEANCE' | 'VIREMENT' | 'INFO' | 'ALERTE';
  titre: string;
  message: string;
  lue: boolean;
  createdAt: string;
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private readonly API = environment.apiUrl;
  unreadCount = signal(0);
  notifications = signal<Notification[]>([]);

  constructor(private http: HttpClient) {}

  load(membreId: number) {
    this.http.get<Notification[]>(`${this.API}/membres/${membreId}/notifications`).subscribe(list => {
      this.notifications.set(list);
      this.unreadCount.set(list.filter(n => !n.lue).length);
    });
  }

  markAllRead(membreId: number) {
    return this.http.patch(`${this.API}/membres/${membreId}/notifications/lues`, {}).pipe(
      tap(() => {
        this.notifications.update(list => list.map(n => ({ ...n, lue: true })));
        this.unreadCount.set(0);
      })
    );
  }

  getIcon(type: string): string {
    const icons: Record<string, string> = {
      ECHEANCE: 'schedule', VIREMENT: 'swap_horiz',
      INFO: 'info', ALERTE: 'warning'
    };
    return icons[type] ?? 'notifications';
  }
}
