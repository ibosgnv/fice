import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TranslatePipe } from '../../../core/i18n/translate.pipe';
import { LangSwitcherComponent } from '../../../shared/components/lang-switcher/lang-switcher.component';

@Component({
  selector: 'app-agences',
  standalone: true,
  imports: [RouterLink, MatIconModule, MatButtonModule, TranslatePipe, LangSwitcherComponent],
  templateUrl: './agences.component.html',
  styleUrl: './agences.component.scss'
})
export class AgencesComponent {
  telHref(tel: string): string {
    return 'tel:' + tel.replace(/\s/g, '');
  }

  mapsUrl(a: { adresse: string; ville: string }): string {
    return 'https://maps.google.com/?q=' + encodeURIComponent(a.adresse + ' ' + a.ville);
  }

  agences = [
    { nom: 'FICE Kinshasa Centre', adresse: 'Avenue de la Démocratie, Q. Gombe', telephone: '+243 81 234 5678', horaires: 'Lun–Ven 8h–17h', ville: 'Kinshasa' },
    { nom: 'FICE Kinshasa Est', adresse: 'Boulevard Lumumba, Q. Lemba', telephone: '+243 81 234 5679', horaires: 'Lun–Ven 8h–17h', ville: 'Kinshasa' },
    { nom: 'FICE Lubumbashi', adresse: 'Avenue Kasaï, Quartier Kenya', telephone: '+243 81 234 5680', horaires: 'Lun–Ven 8h–16h30', ville: 'Lubumbashi' },
    { nom: 'FICE Goma', adresse: 'Rue Himbi, Quartier Himbi', telephone: '+243 81 234 5681', horaires: 'Lun–Ven 8h–16h', ville: 'Goma' },
    { nom: 'FICE Kisangani', adresse: 'Avenue Mobutu, Centre-ville', telephone: '+243 81 234 5682', horaires: 'Lun–Ven 8h–16h', ville: 'Kisangani' },
    { nom: 'FICE Matadi', adresse: 'Avenue du Port, Q. Commercial', telephone: '+243 81 234 5683', horaires: 'Lun–Ven 8h–16h', ville: 'Matadi' },
    { nom: 'FICE Kananga', adresse: 'Avenue Kasai-Central', telephone: '+243 81 234 5684', horaires: 'Lun–Ven 8h–16h', ville: 'Kananga' },
    { nom: 'FICE Mbuji-Mayi', adresse: 'Avenue du Kasaï, Q. Muya', telephone: '+243 81 234 5685', horaires: 'Lun–Ven 8h–16h', ville: 'Mbuji-Mayi' },
  ];
}
