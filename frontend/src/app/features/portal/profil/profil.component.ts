import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AuthService } from '../../../core/services/auth.service';
import { MembreService } from '../../../core/services/membre.service';
import { TranslatePipe } from '../../../core/i18n/translate.pipe';
import { Membre } from '../../../core/models';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [CommonModule, DatePipe, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatSnackBarModule, MatTabsModule, MatProgressBarModule, TranslatePipe],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.scss'
})
export class ProfilComponent implements OnInit {
  private auth = inject(AuthService);
  private membreService = inject(MembreService);
  private fb = inject(FormBuilder);
  private snack = inject(MatSnackBar);

  user = this.auth.currentUser;
  membre: Membre | null = null;
  loading = true;
  saving = false;

  infoForm = this.fb.group({
    telephone: ['', Validators.required],
    adresse:   ['', Validators.required],
    ville:     ['', Validators.required],
  });

  pwdForm = this.fb.group({
    actuel:      ['', Validators.required],
    nouveau:     ['', [Validators.required, Validators.minLength(6)]],
    confirmation:['', Validators.required],
  });

  ngOnInit() {
    this.membreService.getMembre(this.user()?.membreId!).subscribe(m => {
      this.membre = m;
      this.infoForm.patchValue({ telephone: m.telephone, adresse: m.adresse, ville: m.ville });
      this.loading = false;
    });
  }

  saveInfo() {
    const id = this.user()?.membreId;
    if (!id) return;
    this.saving = true;
    const { telephone, adresse, ville } = this.infoForm.value;
    this.membreService.updateMembre(id, { telephone: telephone!, adresse: adresse!, ville: ville! }).subscribe({
      next: () => { this.saving = false; this.snack.open('Informations mises à jour.', 'OK', { duration: 3000 }); },
      error: () => { this.saving = false; this.snack.open('Erreur lors de la mise à jour.', 'OK', { duration: 3000 }); }
    });
  }

  changePassword() {
    if (this.pwdForm.value.nouveau !== this.pwdForm.value.confirmation) {
      this.snack.open('Les mots de passe ne correspondent pas.', 'OK', { duration: 3000 });
      return;
    }
    const id = this.user()?.membreId;
    if (!id) return;
    this.saving = true;
    this.membreService.changePassword(id, {
      motDePasseActuel: this.pwdForm.value.actuel!,
      nouveauMotDePasse: this.pwdForm.value.nouveau!
    }).subscribe({
      next: () => { this.saving = false; this.pwdForm.reset(); this.snack.open('Mot de passe mis à jour.', 'OK', { duration: 3000 }); },
      error: () => { this.saving = false; this.snack.open('Mot de passe actuel incorrect.', 'OK', { duration: 3000 }); }
    });
  }
}
