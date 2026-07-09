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
import { OppositionService } from '../../../core/services/opposition.service';

@Component({
  selector: 'app-opposition',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatSelectModule, TranslatePipe, LangSwitcherComponent],
  templateUrl: './opposition.component.html',
  styleUrl: './opposition.component.scss'
})
export class OppositionComponent {
  private fb = inject(FormBuilder);
  private oppositionService = inject(OppositionService);

  submitted = false;
  loading = false;
  errorMessage = '';
  dossierId = '';

  form = this.fb.group({
    numeroCarte:  ['', Validators.required],
    motif:        ['', Validators.required],
    telephone:    ['', Validators.required],
    confirmation: [false, Validators.requiredTrue]
  });

  motifs = ['Perte', 'Vol', 'Fraude suspectée', 'Autre'];

  submit() {
    if (this.form.invalid) return;
    this.loading = true;
    this.errorMessage = '';
    const v = this.form.value;
    this.oppositionService.creerOpposition({
      numeroCarte: v.numeroCarte!, motif: v.motif!, telephone: v.telephone!
    }).subscribe({
      next: (res) => { this.loading = false; this.dossierId = res.numeroDossier; this.submitted = true; },
      error: () => { this.loading = false; this.errorMessage = 'Une erreur est survenue. Appelez le +243 800 000 000 en urgence.'; }
    });
  }
}
