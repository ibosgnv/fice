import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { TranslatePipe } from '../../../core/i18n/translate.pipe';
import { LangSwitcherComponent } from '../../../shared/components/lang-switcher/lang-switcher.component';
import { AdhesionService } from '../../../core/services/adhesion.service';

@Component({
  selector: 'app-adhesion',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatSelectModule, MatStepperModule, TranslatePipe, LangSwitcherComponent],
  templateUrl: './adhesion.component.html',
  styleUrl: './adhesion.component.scss'
})
export class AdhesionComponent {
  private fb = inject(FormBuilder);
  private adhesionService = inject(AdhesionService);

  submitted = false;
  loading = false;
  errorMessage = '';
  numeroDossier = '';

  step1 = this.fb.group({
    prenom:       ['', Validators.required],
    nom:          ['', Validators.required],
    email:        ['', [Validators.required, Validators.email]],
    telephone:    ['', Validators.required],
    dateNaissance:['', Validators.required],
    ville:        ['', Validators.required],
    adresse:      ['', Validators.required],
  });

  step2 = this.fb.group({
    typeDocument:   ['CNI', Validators.required],
    numeroDocument: ['', Validators.required],
    acceptTermes:   [false, Validators.requiredTrue],
  });

  step3 = this.fb.group({
    nombreParts: [5, [Validators.required, Validators.min(1), Validators.max(100)]],
  });

  readonly valeurPart = 5000;

  get montantTotal() {
    return (this.step3.value.nombreParts ?? 1) * this.valeurPart;
  }

  submit() {
    this.loading = true;
    this.errorMessage = '';
    const { prenom, nom, email, telephone, dateNaissance, ville, adresse } = this.step1.value;
    const { typeDocument, numeroDocument } = this.step2.value;
    const nombreParts = this.step3.value.nombreParts ?? 1;

    this.adhesionService.creerAdhesion({
      prenom: prenom!, nom: nom!, email: email!, telephone: telephone!,
      dateNaissance: dateNaissance!, ville: ville!, adresse: adresse!,
      typeDocument: typeDocument!, numeroDocument: numeroDocument!, nombreParts
    }).subscribe({
      next: (res) => { this.loading = false; this.numeroDossier = res.numeroDossier; this.submitted = true; },
      error: () => { this.loading = false; this.errorMessage = 'Une erreur est survenue. Veuillez réessayer.'; }
    });
  }
}
