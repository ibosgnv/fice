import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { TranslatePipe } from '../../../core/i18n/translate.pipe';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { CompteService } from '../../../core/services/compte.service';
import { CreditService } from '../../../core/services/credit.service';
import { Compte, Credit, Transaction } from '../../../core/models';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule, CurrencyPipe, DatePipe, RouterLink,
    MatCardModule, MatIconModule, MatButtonModule, MatProgressBarModule, TranslatePipe
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  private auth = inject(AuthService);
  private compteService = inject(CompteService);
  private creditService = inject(CreditService);

  user = this.auth.currentUser;
  comptes: Compte[] = [];
  credits: Credit[] = [];
  transactions: Transaction[] = [];
  loading = true;

  get totalEpargne(): number {
    return this.comptes
      .filter(c => c.type === 'EPARGNE' && c.statut === 'ACTIF')
      .reduce((sum, c) => sum + c.solde, 0);
  }

  get creditEnCours(): Credit | undefined {
    return this.credits.find(c => c.statut === 'EN_COURS');
  }

  get progressCredit(): number {
    const c = this.creditEnCours;
    if (!c) return 0;
    return ((c.montantAccorde - c.soldeRestant) / c.montantAccorde) * 100;
  }

  ngOnInit() {
    const membreId = this.user()?.membreId!;
    forkJoin({
      comptes: this.compteService.getComptes(membreId),
      credits: this.creditService.getCredits(membreId),
      transactions: this.compteService.getTransactions(membreId, 5)
    }).subscribe({
      next: ({ comptes, credits, transactions }) => {
        this.comptes = comptes;
        this.credits = credits;
        this.transactions = transactions;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  getTransactionIcon(type: string): string {
    const icons: Record<string, string> = {
      DEPOT: 'arrow_downward',
      RETRAIT: 'arrow_upward',
      VIREMENT_ENTRANT: 'arrow_downward',
      VIREMENT_SORTANT: 'arrow_upward',
      REMBOURSEMENT_CREDIT: 'credit_score',
      INTERET: 'trending_up'
    };
    return icons[type] || 'swap_horiz';
  }

  isCredit(type: string): boolean {
    return type === 'DEPOT' || type === 'VIREMENT_ENTRANT' || type === 'INTERET';
  }
}
