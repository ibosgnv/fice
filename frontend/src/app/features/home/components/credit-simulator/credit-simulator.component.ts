import { Component, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../../../core/i18n/translate.pipe';
import { TranslationService } from '../../../../core/i18n/translation.service';

@Component({
  selector: 'app-credit-simulator',
  standalone: true,
  imports: [CommonModule, FormsModule, MatSliderModule, MatButtonModule, MatIconModule, RouterLink, TranslatePipe, CurrencyPipe],
  templateUrl: './credit-simulator.component.html',
  styleUrl: './credit-simulator.component.scss'
})
export class CreditSimulatorComponent {
  t = inject(TranslationService);

  montant = 1000000;
  duree = 12;
  readonly taux = 12;
  readonly montantMin = 100000;
  readonly montantMax = 5000000;
  readonly montantStep = 50000;
  readonly dureeMin = 6;
  readonly dureeMax = 36;

  get mensualite(): number {
    const r = this.taux / 100 / 12;
    const n = this.duree;
    if (r === 0) return this.montant / n;
    return this.montant * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
  }

  get coutTotal(): number {
    return this.mensualite * this.duree;
  }

  get coutInterets(): number {
    return this.coutTotal - this.montant;
  }

  formatMontant(v: number) {
    return new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 }).format(Math.round(v)) + ' FC';
  }
}
