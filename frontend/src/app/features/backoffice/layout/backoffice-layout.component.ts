import { Component, inject, signal, effect } from '@angular/core';
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
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { TranslatePipe } from '../../../core/i18n/translate.pipe';
import { LangSwitcherComponent } from '../../../shared/components/lang-switcher/lang-switcher.component';

const MOBILE_QUERY = '(max-width: 900px)';

@Component({
  selector: 'app-backoffice-layout',
  standalone: true,
  imports: [
    CommonModule, RouterOutlet, RouterLink, RouterLinkActive,
    MatSidenavModule, MatToolbarModule, MatIconModule,
    MatButtonModule, MatMenuModule, MatDividerModule,
    TranslatePipe, LangSwitcherComponent
  ],
  templateUrl: './backoffice-layout.component.html',
  styleUrl: './backoffice-layout.component.scss'
})
export class BackofficeLayoutComponent {
  auth = inject(AuthService);
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

  closeOnMobile() {
    if (this.isMobile()) this.sidenavOpen.set(false);
  }

  navItems = [
    { label: 'Membres', icon: 'people', route: '/back-office/membres' },
  ];
}
