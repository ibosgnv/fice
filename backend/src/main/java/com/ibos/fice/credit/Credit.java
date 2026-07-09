package com.ibos.fice.credit;

import com.ibos.fice.membre.Membre;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "credits")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Credit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String referenceCredit;

    @Column(nullable = false, precision = 15, scale = 2)
    private BigDecimal montantAccorde;

    @Column(nullable = false, precision = 15, scale = 2)
    private BigDecimal soldeRestant;

    @Column(nullable = false, precision = 15, scale = 2)
    private BigDecimal mensualite;

    private double tauxInteret;
    private int dureeEnMois;
    private LocalDate dateDeblocage;
    private LocalDate dateEcheanceFinal;
    private LocalDate prochaineEcheance;

    @Enumerated(EnumType.STRING)
    private StatutCredit statut;

    private String objet;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "membre_id", nullable = false)
    private Membre membre;

    public enum StatutCredit {
        EN_COURS, REMBOURSE, EN_RETARD, SOLDE
    }
}
