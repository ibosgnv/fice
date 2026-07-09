import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MembreService } from '../../../core/services/membre.service';
import { CompteService } from '../../../core/services/compte.service';
import { CreditService } from '../../../core/services/credit.service';
import { Membre, Compte, Credit, Transaction } from '../../../core/models';
import { TranslatePipe } from '../../../core/i18n/translate.pipe';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-fiche-membre',
  standalone: true,
  imports: [
    CommonModule, CurrencyPipe, DatePipe, RouterLink,
    MatButtonModule, MatIconModule, MatProgressBarModule, MatTabsModule, TranslatePipe
  ],
  templateUrl: './fiche-membre.component.html',
  styleUrl: './fiche-membre.component.scss'
})
export class FicheMembreComponent implements OnInit {
  @Input() id!: string;

  private membreService = inject(MembreService);
  private compteService = inject(CompteService);
  private creditService = inject(CreditService);

  membre: Membre | null = null;
  comptes: Compte[] = [];
  credits: Credit[] = [];
  transactions: Transaction[] = [];
  loading = true;

  get totalEpargne(): number {
    return this.comptes.filter(c => c.statut === 'ACTIF').reduce((s, c) => s + c.solde, 0);
  }

  ngOnInit() {
    const membreId = +this.id;
    forkJoin({
      membre: this.membreService.getMembre(membreId),
      comptes: this.compteService.getComptes(membreId),
      credits: this.creditService.getCredits(membreId),
      transactions: this.compteService.getTransactions(membreId, 10)
    }).subscribe(data => {
      this.membre = data.membre;
      this.comptes = data.comptes;
      this.credits = data.credits;
      this.transactions = data.transactions;
      this.loading = false;
    });
  }

  isCredit(type: string): boolean {
    return ['DEPOT', 'VIREMENT_ENTRANT', 'INTERET'].includes(type);
  }
}
