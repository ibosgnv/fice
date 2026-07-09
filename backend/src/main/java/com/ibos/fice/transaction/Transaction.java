package com.ibos.fice.transaction;

import com.ibos.fice.compte.Compte;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "transactions")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, precision = 15, scale = 2)
    private BigDecimal montant;

    @Enumerated(EnumType.STRING)
    private TypeTransaction type;

    private String libelle;
    private String reference;
    private LocalDateTime dateOperation;

    @Column(nullable = false, precision = 15, scale = 2)
    private BigDecimal soldeApres;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "compte_id", nullable = false)
    private Compte compte;

    public enum TypeTransaction {
        DEPOT, RETRAIT, VIREMENT_ENTRANT, VIREMENT_SORTANT, REMBOURSEMENT_CREDIT, INTERET
    }
}
