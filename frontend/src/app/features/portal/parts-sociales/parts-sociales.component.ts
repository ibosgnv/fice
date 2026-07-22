import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TranslatePipe } from '../../../core/i18n/translate.pipe';
import { AuthService } from '../../../core/services/auth.service';
import { MembreService } from '../../../core/services/membre.service';
import { Membre } from '../../../core/models';

@Component({
  selector: 'app-parts-sociales',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, DatePipe, MatCardModule, MatIconModule, MatProgressBarModule, TranslatePipe],
  templateUrl: './parts-sociales.component.html',
  styleUrl: './parts-sociales.component.scss'
})
export class PartsSocialesComponent implements OnInit {
  private auth = inject(AuthService);
  private membreService = inject(MembreService);

  membre: Membre | null = null;
  loading = true;

  readonly valeurPart = 5000; // CDF par part
  readonly objectifParts = 20;

  get valeurTotale(): number {
    return (this.membre?.nombrePartsSociales ?? 0) * this.valeurPart;
  }

  get progressObjectif(): number {
    return Math.min(((this.membre?.nombrePartsSociales ?? 0) / this.objectifParts) * 100, 100);
  }

  get partsRestantes(): number {
    return Math.max(this.objectifParts - (this.membre?.nombrePartsSociales ?? 0), 0);
  }

  ngOnInit() {
    const membreId = this.auth.currentUser()?.membreId!;
    this.membreService.getMembre(membreId).subscribe(m => {
      this.membre = m;
      this.loading = false;
    });
  }
}
