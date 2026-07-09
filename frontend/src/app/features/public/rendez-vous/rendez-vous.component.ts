import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { TranslatePipe } from '../../../core/i18n/translate.pipe';
import { LangSwitcherComponent } from '../../../shared/components/lang-switcher/lang-switcher.component';
import { RendezVousService } from '../../../core/services/rendez-vous.service';

@Component({
  selector: 'app-rendez-vous',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatSelectModule, TranslatePipe, LangSwitcherComponent],
  templateUrl: './rendez-vous.component.html',
  styleUrl: './rendez-vous.component.scss'
})
export class RendezVousComponent {
  private fb = inject(FormBuilder);
  private rdvService = inject(RendezVousService);

  submitted = false;
  loading = false;
  errorMessage = '';
  reference = '';

  form = this.fb.group({
    prenom:   ['', Validators.required],
    nom:      ['', Validators.required],
    telephone:['', Validators.required],
    agence:   ['', Validators.required],
    motif:    ['', Validators.required],
    date:     ['', Validators.required],
    heure:    ['', Validators.required],
  });

  agences = ['Kinshasa Centre', 'Kinshasa Est', 'Lubumbashi', 'Goma', 'Kisangani', 'Matadi', 'Kananga', 'Mbuji-Mayi'];
  motifs  = ['Ouverture de compte', 'Demande de crédit', 'Renseignements', 'Adhésion', 'Autre'];
  heures  = ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00'];

  submit() {
    if (this.form.invalid) return;
    this.loading = true;
    this.errorMessage = '';
    const v = this.form.value;
    this.rdvService.prendreRendezVous({
      prenom: v.prenom!, nom: v.nom!, telephone: v.telephone!,
      agence: v.agence!, motif: v.motif!, date: v.date!, heure: v.heure!
    }).subscribe({
      next: (res) => { this.loading = false; this.reference = res.reference; this.submitted = true; },
      error: () => { this.loading = false; this.errorMessage = 'Une erreur est survenue. Veuillez réessayer.'; }
    });
  }
}
