package com.ibos.fice.compte;

import com.ibos.fice.membre.Membre;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "comptes")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Compte {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String numeroCompte;

    @Enumerated(EnumType.STRING)
    private TypeCompte type;

    @Column(nullable = false, precision = 15, scale = 2)
    private BigDecimal solde;

    private String devise;
    private LocalDate dateOuverture;

    @Enumerated(EnumType.STRING)
    private StatutCompte statut;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "membre_id", nullable = false)
    private Membre membre;

    public enum TypeCompte {
        EPARGNE, COURANT
    }

    public enum StatutCompte {
        ACTIF, BLOQUE, CLOTURE
    }
}
