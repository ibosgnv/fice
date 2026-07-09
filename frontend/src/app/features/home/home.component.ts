import { Component, inject, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslationService } from '../../core/i18n/translation.service';
import { TranslatePipe } from '../../core/i18n/translate.pipe';
import { LangSwitcherComponent } from '../../shared/components/lang-switcher/lang-switcher.component';
import { AuthService } from '../../core/services/auth.service';
import { CreditSimulatorComponent } from './components/credit-simulator/credit-simulator.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, MatButtonModule, MatIconModule, TranslatePipe, LangSwitcherComponent, CreditSimulatorComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  t = inject(TranslationService);
  auth = inject(AuthService);

  isLoggedIn = this.auth.isAuthenticated();
  currentUser = this.auth.currentUser;

  private intersectionObserver?: IntersectionObserver;
  private revealObserver?: IntersectionObserver;
  private counterAnimated = false;

  services = [
    { icon: 'person_add',             key: 'services.ouvrir',   route: '/connexion' },
    { icon: 'savings',                key: 'services.epargner', route: '/connexion' },
    { icon: 'credit_score',           key: 'services.emprunter',route: '#simulateur' },
    { icon: 'account_balance_wallet', key: 'services.carte',    route: '/connexion' },
    { icon: 'groups',                 key: 'services.parts',    route: '/connexion' },
    { icon: 'support_agent',          key: 'services.aide',     route: '#contact' },
  ];

  advantages = [
    { icon: 'location_on',  titreKey: 'avantage.local.titre',   descKey: 'avantage.local.desc'   },
    { icon: 'phone_iphone', titreKey: 'avantage.app.titre',     descKey: 'avantage.app.desc'     },
    { icon: 'shield',       titreKey: 'avantage.garanti.titre', descKey: 'avantage.garanti.desc' },
  ];

  segments = [
    { icon: 'school',          titreKey: 'seg.etudiants.titre', descKey: 'seg.etudiants.desc' },
    { icon: 'family_restroom', titreKey: 'seg.familles.titre',  descKey: 'seg.familles.desc'  },
    { icon: 'store',           titreKey: 'seg.entrepren.titre', descKey: 'seg.entrepren.desc' },
    { icon: 'agriculture',     titreKey: 'seg.agricul.titre',   descKey: 'seg.agricul.desc'   },
  ];

  promos = [
    { icon: 'account_balance_wallet', color: '#0F172A', titreKey: 'promo.1.titre', descKey: 'promo.1.desc', ctaKey: 'promo.1.cta', route: '/connexion' },
    { icon: 'agriculture',            color: '#e65100', titreKey: 'promo.2.titre', descKey: 'promo.2.desc', ctaKey: 'promo.2.cta', route: '#simulateur' },
    { icon: 'groups',                 color: '#0F172A', titreKey: 'promo.3.titre', descKey: 'promo.3.desc', ctaKey: 'promo.3.cta', route: '/connexion' },
  ];

  counters = [
    { target: 12400, suffix: '+', labelKey: 'dash.comptes.actifs', display: '0' },
    { target: 8,     suffix: '',  labelKey: 'nav.agences',         display: '0' },
    { target: 15,    suffix: ' ans', labelKey: 'avantage.local.titre', display: '0' },
    { target: 98,    suffix: '%', labelKey: 'app.stat3.label',     display: '0' },
  ];

  testimonials = [
    { texteKey: 'testi.1.texte', nomKey: 'testi.1.nom', roleKey: 'testi.1.role', initials: 'JK', color: '#0F172A' },
    { texteKey: 'testi.2.texte', nomKey: 'testi.2.nom', roleKey: 'testi.2.role', initials: 'MN', color: '#0F172A' },
    { texteKey: 'testi.3.texte', nomKey: 'testi.3.nom', roleKey: 'testi.3.role', initials: 'PM', color: '#e65100' },
  ];

  news = [
    { catKey: 'news.1.cat', titreKey: 'news.1.titre', descKey: 'news.1.desc', icon: 'lightbulb', color: '#F1F5F9', iconColor: '#0F172A' },
    { catKey: 'news.2.cat', titreKey: 'news.2.titre', descKey: 'news.2.desc', icon: 'groups',    color: '#F1F5F9', iconColor: '#0F172A' },
    { catKey: 'news.3.cat', titreKey: 'news.3.titre', descKey: 'news.3.desc', icon: 'menu_book', color: '#fff8e1', iconColor: '#f57f17' },
  ];

  impactStats = [
    { icon: 'trending_up',     valKey: 'impact.1.val', labelKey: 'impact.1.label' },
    { icon: 'diversity_3',     valKey: 'impact.2.val', labelKey: 'impact.2.label' },
    { icon: 'map',             valKey: 'impact.3.val', labelKey: 'impact.3.label' },
    { icon: 'verified',        valKey: 'impact.4.val', labelKey: 'impact.4.label' },
  ];

  ngAfterViewInit() {
    this.setupCounterAnimation();
    this.setupScrollReveal();
  }

  ngOnDestroy() {
    this.intersectionObserver?.disconnect();
    this.revealObserver?.disconnect();
  }

  private setupCounterAnimation() {
    const section = document.querySelector('.counters-section');
    if (!section) return;

    this.intersectionObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !this.counterAnimated) {
          this.counterAnimated = true;
          this.animateCounters();
        }
      },
      { threshold: 0.3 }
    );
    this.intersectionObserver.observe(section);
  }

  private setupScrollReveal() {
    this.revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('section-visible');
            this.revealObserver?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );

    const batchSelectors = [
      '.promo-section', '.advantages', '.testimonials-section',
      '.news-section', '.app-section', '.impact-section', '.segments'
    ];
    batchSelectors.forEach(sel => {
      const el = document.querySelector(sel);
      if (el) {
        el.classList.add('section-reveal');
        this.revealObserver!.observe(el);
      }
    });

    const cardSelectors = [
      '.promo-card', '.advantage-card', '.testimonial-card',
      '.news-card', '.segment-card', '.impact-stat'
    ];
    cardSelectors.forEach(sel => {
      document.querySelectorAll(sel).forEach((el, i) => {
        el.classList.add('section-reveal');
        (el as HTMLElement).style.transitionDelay = `${i * 70}ms`;
        this.revealObserver!.observe(el);
      });
    });
  }

  private animateCounters() {
    this.counters.forEach((counter) => {
      const duration = 1800;
      const step = 16;
      const steps = duration / step;
      const increment = counter.target / steps;
      let current = 0;

      const timer = setInterval(() => {
        current = Math.min(current + increment, counter.target);
        counter.display = Math.floor(current).toLocaleString('fr-FR') + counter.suffix;
        if (current >= counter.target) clearInterval(timer);
      }, step);
    });
  }
}
