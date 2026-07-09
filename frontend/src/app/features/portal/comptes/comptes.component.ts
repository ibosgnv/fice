import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { TranslatePipe } from '../../../core/i18n/translate.pipe';
import { TranslationService } from '../../../core/i18n/translation.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AuthService } from '../../../core/services/auth.service';
import { CompteService } from '../../../core/services/compte.service';
import { Compte, Transaction } from '../../../core/models';

@Component({
  selector: 'app-comptes',
  standalone: true,
  imports: [
    CommonModule, CurrencyPipe, DatePipe,
    MatCardModule, MatIconModule, MatButtonModule,
    MatTabsModule, MatTableModule, MatChipsModule, MatProgressBarModule, TranslatePipe
  ],
  templateUrl: './comptes.component.html',
  styleUrl: './comptes.component.scss'
})
export class ComptesComponent implements OnInit {
  private auth = inject(AuthService);
  private compteService = inject(CompteService);

  comptes: Compte[] = [];
  selectedCompte = signal<Compte | null>(null);
  transactions: Transaction[] = [];
  loading = true;
  loadingTx = false;
  displayedColumns = ['date', 'libelle', 'reference', 'montant', 'soldeApres'];

  ngOnInit() {
    const membreId = this.auth.currentUser()?.membreId!;
    this.compteService.getComptes(membreId).subscribe(comptes => {
      this.comptes = comptes;
      this.loading = false;
      if (comptes.length) this.selectCompte(comptes[0]);
    });
  }

  selectCompte(compte: Compte) {
    this.selectedCompte.set(compte);
    this.loadingTx = true;
    this.compteService.getTransactionsByCompte(compte.id, 30).subscribe(txs => {
      this.transactions = txs;
      this.loadingTx = false;
    });
  }

  isCredit(type: string): boolean {
    return ['DEPOT', 'VIREMENT_ENTRANT', 'INTERET'].includes(type);
  }

  private svc = inject(TranslationService);

  getTypeLabel(type: string): string {
    const keys: Record<string, string> = {
      DEPOT: 'tx.depot', RETRAIT: 'tx.retrait',
      VIREMENT_ENTRANT: 'tx.virement.in', VIREMENT_SORTANT: 'tx.virement.out',
      REMBOURSEMENT_CREDIT: 'tx.remboursement', INTERET: 'tx.interet'
    };
    return this.svc.t(keys[type] ?? type);
  }
}
