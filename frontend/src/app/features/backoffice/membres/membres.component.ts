import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormsModule } from '@angular/forms';
import { MembreService } from '../../../core/services/membre.service';
import { TranslatePipe } from '../../../core/i18n/translate.pipe';
import { Membre } from '../../../core/models';

@Component({
  selector: 'app-membres',
  standalone: true,
  imports: [
    CommonModule, DatePipe, RouterLink, FormsModule,
    MatTableModule, MatInputModule, MatFormFieldModule,
    MatIconModule, MatButtonModule, MatProgressBarModule, TranslatePipe
  ],
  templateUrl: './membres.component.html',
  styleUrl: './membres.component.scss'
})
export class MembresComponent implements OnInit {
  private membreService = inject(MembreService);

  membres: Membre[] = [];
  filtered: Membre[] = [];
  searchQuery = '';
  loading = true;
  displayedColumns = ['membre', 'contact', 'dateAdhesion', 'parts', 'statut', 'actions'];

  ngOnInit() {
    this.membreService.getAllMembres().subscribe(membres => {
      this.membres = membres;
      this.filtered = membres;
      this.loading = false;
    });
  }

  search() {
    const q = this.searchQuery.toLowerCase();
    this.filtered = this.membres.filter(m =>
      m.nom.toLowerCase().includes(q) ||
      m.prenom.toLowerCase().includes(q) ||
      m.email.toLowerCase().includes(q) ||
      m.numeroDeMembre.toLowerCase().includes(q)
    );
  }
}
