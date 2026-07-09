import { Component, inject, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
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
  sidenavOpen = signal(true);

  navItems = [
    { label: 'Membres', icon: 'people', route: '/back-office/membres' },
  ];
}
