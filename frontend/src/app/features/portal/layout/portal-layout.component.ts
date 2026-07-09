import { Component, inject, signal, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatBadgeModule } from '@angular/material/badge';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { NotificationService } from '../../../core/services/notification.service';
import { TranslatePipe } from '../../../core/i18n/translate.pipe';
import { LangSwitcherComponent } from '../../../shared/components/lang-switcher/lang-switcher.component';
import { NotificationsPanelComponent } from '../notifications/notifications-panel.component';

@Component({
  selector: 'app-portal-layout',
  standalone: true,
  imports: [
    CommonModule, RouterOutlet, RouterLink, RouterLinkActive,
    MatSidenavModule, MatToolbarModule, MatIconModule,
    MatButtonModule, MatMenuModule, MatDividerModule, MatBadgeModule,
    TranslatePipe, LangSwitcherComponent, NotificationsPanelComponent
  ],
  templateUrl: './portal-layout.component.html',
  styleUrl: './portal-layout.component.scss'
})
export class PortalLayoutComponent implements OnInit {
  auth = inject(AuthService);
  notifSvc = inject(NotificationService);
  user = this.auth.currentUser;
  sidenavOpen = signal(true);

  navItems = [
    { labelKey: 'portal.nav.dashboard', icon: 'dashboard',              route: '/espace-membre/tableau-de-bord' },
    { labelKey: 'portal.nav.comptes',   icon: 'account_balance_wallet', route: '/espace-membre/comptes' },
    { labelKey: 'portal.nav.credits',   icon: 'credit_score',           route: '/espace-membre/credits' },
    { labelKey: 'portal.nav.parts',     icon: 'groups',                 route: '/espace-membre/parts-sociales' },
  ];

  ngOnInit() {
    const id = this.user()?.membreId;
    if (id) this.notifSvc.load(id);
  }

  toggleSidenav() {
    this.sidenavOpen.update(v => !v);
  }
}
