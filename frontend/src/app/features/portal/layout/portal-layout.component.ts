import { Component, inject, signal, effect, OnInit } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs';
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

const MOBILE_QUERY = '(max-width: 900px)';

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
  isMobile = toSignal(
    inject(BreakpointObserver).observe(MOBILE_QUERY).pipe(map(r => r.matches)),
    { initialValue: false }
  );
  sidenavOpen = signal(true);

  constructor() {
    // Sidenav ouvert par défaut sur desktop, fermé sur mobile
    effect(() => this.sidenavOpen.set(!this.isMobile()), { allowSignalWrites: true });
  }

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

  closeOnMobile() {
    if (this.isMobile()) this.sidenavOpen.set(false);
  }
}
