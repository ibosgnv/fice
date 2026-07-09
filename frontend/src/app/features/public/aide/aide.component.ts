import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../../core/i18n/translate.pipe';
import { LangSwitcherComponent } from '../../../shared/components/lang-switcher/lang-switcher.component';

@Component({
  selector: 'app-aide',
  standalone: true,
  imports: [CommonModule, RouterLink, MatIconModule, MatButtonModule, MatExpansionModule, TranslatePipe, LangSwitcherComponent],
  templateUrl: './aide.component.html',
  styleUrl: './aide.component.scss'
})
export class AideComponent {
  faq = [
    { q: 'Comment ouvrir un compte à la FICE ?', r: 'Rendez-vous dans l\'une de nos 8 agences avec une pièce d\'identité valide. Vous pouvez aussi soumettre votre demande en ligne via le formulaire "Devenir membre".' },
    { q: 'Quels sont les taux d\'épargne ?', r: 'La FICE offre des taux compétitifs selon la durée. Contactez votre agence ou simulez votre épargne sur notre site pour plus d\'informations.' },
    { q: 'Comment obtenir un crédit ?', r: 'Connectez-vous à votre espace membre, accédez à "Mes crédits" et faites une demande. Un conseiller vous contactera sous 48h.' },
    { q: 'Que faire en cas de perte de ma carte ?', r: 'Faites opposition immédiatement via le service dédié sur notre site ou appelez le +243 800 000 000 disponible 24h/24.' },
    { q: 'Comment mettre à jour mes informations personnelles ?', r: 'Connectez-vous à votre espace membre, allez dans "Mon profil" et modifiez vos coordonnées.' },
    { q: 'Puis-je consulter mes comptes depuis l\'étranger ?', r: 'Oui, l\'application mobile FICE est accessible depuis n\'importe quel pays avec une connexion internet.' },
    { q: 'Qu\'est-ce qu\'une part sociale ?', r: 'Une part sociale représente votre participation au capital de la coopérative. Elle coûte 5 000 FC et vous donne droit de vote en assemblée générale et à des dividendes annuels.' },
    { q: 'Comment contacter mon conseiller ?', r: 'Depuis votre espace membre, utilisez la messagerie sécurisée. Vous pouvez aussi appeler directement votre agence ou prendre rendez-vous en ligne.' },
  ];
}
