package com.ibos.fice.mock;

import com.ibos.fice.compte.Compte;
import com.ibos.fice.compte.CompteRepository;
import com.ibos.fice.credit.Credit;
import com.ibos.fice.credit.CreditRepository;
import com.ibos.fice.membre.Membre;
import com.ibos.fice.membre.MembreRepository;
import com.ibos.fice.notification.Notification;
import com.ibos.fice.notification.NotificationRepository;
import com.ibos.fice.transaction.Transaction;
import com.ibos.fice.transaction.TransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final MembreRepository membreRepository;
    private final CompteRepository compteRepository;
    private final CreditRepository creditRepository;
    private final TransactionRepository transactionRepository;
    private final PasswordEncoder passwordEncoder;
    private final NotificationRepository notificationRepository;

    @Override
    public void run(String... args) {
        if (membreRepository.count() > 0) {
            return;
        }
        Membre m1 = seedMembres();
        seedNotifications(m1);
    }

    private void seedNotifications(Membre m1) {
        notificationRepository.save(Notification.builder()
                .type(Notification.TypeNotif.ECHEANCE)
                .titre("Échéance crédit dans 3 jours")
                .message("Votre mensualité de 125 000 FC est due le 15 juin 2026.")
                .lue(false).createdAt(LocalDateTime.now().minusHours(2)).membre(m1).build());

        notificationRepository.save(Notification.builder()
                .type(Notification.TypeNotif.VIREMENT)
                .titre("Virement reçu")
                .message("Vous avez reçu un virement de 200 000 FC via Orange Money.")
                .lue(false).createdAt(LocalDateTime.now().minusDays(1)).membre(m1).build());

        notificationRepository.save(Notification.builder()
                .type(Notification.TypeNotif.INFO)
                .titre("Assemblée générale 2026")
                .message("La prochaine AG de la FICE aura lieu le 20 juillet 2026. Votre présence est souhaitée.")
                .lue(true).createdAt(LocalDateTime.now().minusDays(5)).membre(m1).build());
    }

    private Membre seedMembres() {
        // Membre 1 — Amara Diallo
        Membre m1 = membreRepository.save(Membre.builder()
                .numeroDeMembre("MBR-2021-0042")
                .nom("Diallo")
                .prenom("Amara")
                .email("amara.diallo@email.com")
                .motDePasse(passwordEncoder.encode("membre123"))
                .telephone("+225 07 12 34 56 78")
                .dateNaissance(LocalDate.of(1985, 3, 15))
                .adresse("Rue des Coopérateurs, Quartier Plateau")
                .ville("Abidjan")
                .statut(Membre.StatutMembre.ACTIF)
                .dateAdhesion(LocalDate.of(2021, 6, 1))
                .nombrePartsSociales(5)
                .build());

        Compte epargne1 = compteRepository.save(Compte.builder()
                .numeroCompte("CEP-2021-0042-01")
                .type(Compte.TypeCompte.EPARGNE)
                .solde(new BigDecimal("847500.00"))
                .devise("CDF")
                .dateOuverture(LocalDate.of(2021, 6, 1))
                .statut(Compte.StatutCompte.ACTIF)
                .membre(m1)
                .build());

        creditRepository.save(Credit.builder()
                .referenceCredit("CRD-2024-0019")
                .montantAccorde(new BigDecimal("2500000.00"))
                .soldeRestant(new BigDecimal("1625000.00"))
                .mensualite(new BigDecimal("125000.00"))
                .tauxInteret(12.0)
                .dureeEnMois(24)
                .dateDeblocage(LocalDate.of(2024, 1, 15))
                .dateEcheanceFinal(LocalDate.of(2026, 1, 15))
                .prochaineEcheance(LocalDate.of(2026, 6, 15))
                .statut(Credit.StatutCredit.EN_COURS)
                .objet("Achat de matériel agricole")
                .membre(m1)
                .build());

        seedTransactions(epargne1, m1);

        // Membre 2 — Fatou Coulibaly
        Membre m2 = membreRepository.save(Membre.builder()
                .numeroDeMembre("MBR-2020-0018")
                .nom("Coulibaly")
                .prenom("Fatou")
                .email("fatou.coulibaly@email.com")
                .motDePasse(passwordEncoder.encode("membre123"))
                .telephone("+225 05 98 76 54 32")
                .dateNaissance(LocalDate.of(1978, 9, 22))
                .adresse("Avenue de l'Indépendance")
                .ville("Bouaké")
                .statut(Membre.StatutMembre.ACTIF)
                .dateAdhesion(LocalDate.of(2020, 2, 10))
                .nombrePartsSociales(10)
                .build());

        Compte epargne2 = compteRepository.save(Compte.builder()
                .numeroCompte("CEP-2020-0018-01")
                .type(Compte.TypeCompte.EPARGNE)
                .solde(new BigDecimal("3250000.00"))
                .devise("CDF")
                .dateOuverture(LocalDate.of(2020, 2, 10))
                .statut(Compte.StatutCompte.ACTIF)
                .membre(m2)
                .build());

        // Membre 3 — Kofi Mensah
        Membre m3 = membreRepository.save(Membre.builder()
                .numeroDeMembre("MBR-2022-0075")
                .nom("Mensah")
                .prenom("Kofi")
                .email("kofi.mensah@email.com")
                .motDePasse(passwordEncoder.encode("membre123"))
                .telephone("+225 01 23 45 67 89")
                .dateNaissance(LocalDate.of(1992, 11, 5))
                .adresse("Quartier Commerce, Rue 14")
                .ville("San-Pédro")
                .statut(Membre.StatutMembre.ACTIF)
                .dateAdhesion(LocalDate.of(2022, 4, 18))
                .nombrePartsSociales(3)
                .build());

        Compte epargne3 = compteRepository.save(Compte.builder()
                .numeroCompte("CEP-2022-0075-01")
                .type(Compte.TypeCompte.EPARGNE)
                .solde(new BigDecimal("425000.00"))
                .devise("CDF")
                .dateOuverture(LocalDate.of(2022, 4, 18))
                .statut(Compte.StatutCompte.ACTIF)
                .membre(m3)
                .build());

        creditRepository.save(Credit.builder()
                .referenceCredit("CRD-2025-0007")
                .montantAccorde(new BigDecimal("500000.00"))
                .soldeRestant(new BigDecimal("350000.00"))
                .mensualite(new BigDecimal("50000.00"))
                .tauxInteret(10.0)
                .dureeEnMois(12)
                .dateDeblocage(LocalDate.of(2025, 3, 1))
                .dateEcheanceFinal(LocalDate.of(2026, 3, 1))
                .prochaineEcheance(LocalDate.of(2026, 6, 1))
                .statut(Credit.StatutCredit.EN_COURS)
                .objet("Fonds de roulement commerce")
                .membre(m3)
                .build());

        return m1;
    }

    private void seedTransactions(Compte compte, Membre membre) {
        BigDecimal solde = compte.getSolde();

        transactionRepository.save(Transaction.builder()
                .montant(new BigDecimal("125000.00"))
                .type(Transaction.TypeTransaction.REMBOURSEMENT_CREDIT)
                .libelle("Remboursement crédit CRD-2024-0019")
                .reference("TXN-2026-05-001")
                .dateOperation(LocalDateTime.now().minusDays(2))
                .soldeApres(solde)
                .compte(compte)
                .build());

        transactionRepository.save(Transaction.builder()
                .montant(new BigDecimal("50000.00"))
                .type(Transaction.TypeTransaction.DEPOT)
                .libelle("Dépôt espèces - Agence Plateau")
                .reference("TXN-2026-05-002")
                .dateOperation(LocalDateTime.now().minusDays(7))
                .soldeApres(solde.subtract(new BigDecimal("125000.00")))
                .compte(compte)
                .build());

        transactionRepository.save(Transaction.builder()
                .montant(new BigDecimal("200000.00"))
                .type(Transaction.TypeTransaction.DEPOT)
                .libelle("Virement reçu - ORANGE MONEY")
                .reference("TXN-2026-04-018")
                .dateOperation(LocalDateTime.now().minusDays(22))
                .soldeApres(solde.subtract(new BigDecimal("175000.00")))
                .compte(compte)
                .build());

        transactionRepository.save(Transaction.builder()
                .montant(new BigDecimal("30000.00"))
                .type(Transaction.TypeTransaction.RETRAIT)
                .libelle("Retrait guichet")
                .reference("TXN-2026-04-009")
                .dateOperation(LocalDateTime.now().minusDays(35))
                .soldeApres(solde.subtract(new BigDecimal("375000.00")))
                .compte(compte)
                .build());

        transactionRepository.save(Transaction.builder()
                .montant(new BigDecimal("125000.00"))
                .type(Transaction.TypeTransaction.REMBOURSEMENT_CREDIT)
                .libelle("Remboursement crédit CRD-2024-0019")
                .reference("TXN-2026-04-001")
                .dateOperation(LocalDateTime.now().minusDays(32))
                .soldeApres(solde.subtract(new BigDecimal("345000.00")))
                .compte(compte)
                .build());

        transactionRepository.save(Transaction.builder()
                .montant(new BigDecimal("15750.00"))
                .type(Transaction.TypeTransaction.INTERET)
                .libelle("Intérêts créditeurs - Mars 2026")
                .reference("INT-2026-03-042")
                .dateOperation(LocalDateTime.now().minusDays(60))
                .soldeApres(solde.subtract(new BigDecimal("470000.00")))
                .compte(compte)
                .build());
    }
}
