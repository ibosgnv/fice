package com.ibos.fice.membre;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "membres")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Membre {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String numeroDeMembre;

    @Column(nullable = false)
    private String nom;

    @Column(nullable = false)
    private String prenom;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String motDePasse;

    private String telephone;
    private LocalDate dateNaissance;
    private String adresse;
    private String ville;

    @Enumerated(EnumType.STRING)
    private StatutMembre statut;

    private LocalDate dateAdhesion;
    private int nombrePartsSociales;

    public enum StatutMembre {
        ACTIF, SUSPENDU, INACTIF
    }
}
