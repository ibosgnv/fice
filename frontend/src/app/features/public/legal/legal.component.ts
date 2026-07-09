import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';

const PAGES: Record<string, { titre: string; contenu: string }> = {
  mentions: {
    titre: 'Mentions légales',
    contenu: `<h3>Éditeur</h3><p>FICE — Fédération des Institutions Coopératives d'Épargne<br>Siège social : Avenue de la Démocratie, Kinshasa, RDC<br>Téléphone : +243 800 000 000</p>
    <h3>Agrément</h3><p>La FICE est agréée par la Banque Centrale du Congo sous le numéro d'agrément BCC/2009/001.</p>
    <h3>Responsable de publication</h3><p>Direction Générale FICE</p>
    <h3>Hébergement</h3><p>Ce site est hébergé sur des serveurs sécurisés conformes aux normes en vigueur.</p>`
  },
  rgpd: {
    titre: 'Protection des données',
    contenu: `<h3>Données collectées</h3><p>La FICE collecte uniquement les données nécessaires à la gestion de votre compte et à la fourniture de nos services financiers.</p>
    <h3>Utilisation</h3><p>Vos données sont utilisées exclusivement pour la gestion de la relation client et ne sont jamais cédées à des tiers sans votre consentement.</p>
    <h3>Vos droits</h3><p>Conformément à la réglementation en vigueur, vous disposez d'un droit d'accès, de rectification et de suppression de vos données.</p>
    <h3>Contact DPO</h3><p>Pour exercer vos droits : dpo@fice.cd</p>`
  },
  cgu: {
    titre: 'Conditions Générales d\'Utilisation',
    contenu: `<h3>Article 1 — Objet</h3><p>Les présentes CGU régissent l'utilisation de l'espace membre en ligne de la FICE.</p>
    <h3>Article 2 — Accès</h3><p>L'accès à l'espace membre est réservé aux membres en règle de la coopérative FICE.</p>
    <h3>Article 3 — Sécurité</h3><p>L'utilisateur est responsable de la confidentialité de ses identifiants de connexion.</p>
    <h3>Article 4 — Responsabilité</h3><p>La FICE met tout en œuvre pour assurer la disponibilité de ses services mais ne saurait être tenue responsable d'interruptions indépendantes de sa volonté.</p>`
  }
};

@Component({
  selector: 'app-legal',
  standalone: true,
  imports: [CommonModule, RouterLink, MatButtonModule, MatIconModule],
  template: `
    <div class="public-page">
      <div class="public-header">
        <div class="brand"><span class="material-icons-round">account_balance</span><span>FICE</span></div>
        <a routerLink="/" mat-button>← Accueil</a>
      </div>
      <div class="public-content">
        <h1>{{ page()?.titre }}</h1>
        <div class="legal-content" [innerHTML]="page()?.contenu"></div>
      </div>
    </div>
  `,
  styles: [`.public-page{min-height:100vh;background:#f5f5f5}.public-header{background:white;border-bottom:1px solid #e0e0e0;padding:0 40px;height:60px;display:flex;align-items:center;justify-content:space-between;.brand{display:flex;align-items:center;gap:8px;font-weight:700;font-size:1rem;letter-spacing:1px;color:var(--color-primary);.material-icons-round{font-size:22px}}}.public-content{max-width:760px;margin:0 auto;padding:48px 24px;h1{font-size:1.5rem;font-weight:700;margin:0 0 24px}}.legal-content{background:white;border:1px solid #e0e0e0;border-radius:8px;padding:32px;h3{color:var(--color-primary);font-size:1rem;margin:0 0 6px}p{font-size:0.875rem;color:#424242;line-height:1.7;margin:0 0 20px}}`]
})
export class LegalComponent {
  private route = inject(ActivatedRoute);
  page = toSignal(this.route.params.pipe(map(p => PAGES[p['slug']] ?? PAGES['mentions'])));
}
