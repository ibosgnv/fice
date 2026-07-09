import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe, DecimalPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { TranslatePipe } from '../../../core/i18n/translate.pipe';
import { TranslationService } from '../../../core/i18n/translation.service';
import { AuthService } from '../../../core/services/auth.service';
import { CreditService } from '../../../core/services/credit.service';
import { Credit } from '../../../core/models';

@Component({
  selector: 'app-credits',
  standalone: true,
  imports: [
    CommonModule, CurrencyPipe, DatePipe, DecimalPipe,
    MatCardModule, MatIconModule, MatButtonModule,
    MatProgressBarModule, MatTableModule, TranslatePipe
  ],
  templateUrl: './credits.component.html',
  styleUrl: './credits.component.scss'
})
export class CreditsComponent implements OnInit {
  private auth = inject(AuthService);
  private creditService = inject(CreditService);

  credits: Credit[] = [];
  loading = true;
  private svc = inject(TranslationService);

  ngOnInit() {
    const membreId = this.auth.currentUser()?.membreId!;
    this.creditService.getCredits(membreId).subscribe(credits => {
      this.credits = credits;
      this.loading = false;
    });
  }

  getProgress(credit: Credit): number {
    return ((credit.montantAccorde - credit.soldeRestant) / credit.montantAccorde) * 100;
  }

  getMoisRestants(credit: Credit): number {
    return Math.round(credit.soldeRestant / credit.mensualite);
  }

  getStatutLabel(statut: string): string {
    const keys: Record<string, string> = {
      EN_COURS: 'status.en_cours', REMBOURSE: 'status.rembourse',
      EN_RETARD: 'status.en_retard', SOLDE: 'status.solde'
    };
    return this.svc.t(keys[statut] ?? statut);
  }

  getEcheances(credit: Credit): { numero: number; date: Date; montant: number; statut: string }[] {
    const echeances = [];
    const debut = new Date(credit.dateDeblocage);
    const moisRembourses = credit.dureeEnMois - this.getMoisRestants(credit);

    for (let i = 1; i <= Math.min(credit.dureeEnMois, 6); i++) {
      const date = new Date(debut);
      date.setMonth(debut.getMonth() + i);
      echeances.push({
        numero: i,
        date,
        montant: credit.mensualite,
        statut: i <= moisRembourses ? 'PAYE' : i === moisRembourses + 1 ? 'A_VENIR' : 'FUTUR'
      });
    }
    return echeances;
  }
}
