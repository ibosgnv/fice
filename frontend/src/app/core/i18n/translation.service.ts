import { Injectable, signal } from '@angular/core';
import { Lang, TRANSLATIONS } from './translations';

@Injectable({ providedIn: 'root' })
export class TranslationService {
  lang = signal<Lang>('fr');

  t(key: string): string {
    return TRANSLATIONS[this.lang()][key] ?? TRANSLATIONS['fr'][key] ?? key;
  }

  toggle() {
    this.lang.set(this.lang() === 'fr' ? 'ln' : 'fr');
  }
}
