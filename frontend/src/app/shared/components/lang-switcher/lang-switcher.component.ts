import { Component, inject } from '@angular/core';
import { TranslationService } from '../../../core/i18n/translation.service';

@Component({
  selector: 'app-lang-switcher',
  standalone: true,
  template: `
    <button class="lang-switcher" (click)="t.toggle()" [attr.title]="t.lang() === 'fr' ? 'Passer en Lingala' : 'Passer en Français'">
      <span [class.lang-active]="t.lang() === 'fr'">FR</span>
      <span class="lang-sep">|</span>
      <span [class.lang-active]="t.lang() === 'ln'">LN</span>
    </button>
  `,
  styles: [`
    .lang-switcher {
      display: flex; align-items: center; gap: 4px;
      background: none; border: 1px solid #e0e0e0;
      border-radius: 4px; padding: 4px 10px;
      cursor: pointer; font-size: 0.78rem; font-weight: 600;
      color: #757575; transition: border-color .15s, color .15s;
      &:hover { border-color: var(--color-primary); color: var(--color-primary); }
      .lang-active { color: var(--color-primary); font-weight: 700; }
      .lang-sep { color: #e0e0e0; margin: 0 1px; }
    }
  `]
})
export class LangSwitcherComponent {
  t = inject(TranslationService);
}
