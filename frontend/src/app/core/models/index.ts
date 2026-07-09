export interface LoginRequest {
  email: string;
  motDePasse: string;
}

export interface LoginResponse {
  token: string;
  role: 'MEMBRE' | 'AGENT';
  nom: string;
  prenom: string;
  numeroDeMembre: string;
  membreId: number;
}

export interface Membre {
  id: number;
  numeroDeMembre: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  dateNaissance: string;
  adresse: string;
  ville: string;
  statut: 'ACTIF' | 'SUSPENDU' | 'INACTIF';
  dateAdhesion: string;
  nombrePartsSociales: number;
}

export interface Compte {
  id: number;
  numeroCompte: string;
  type: 'EPARGNE' | 'COURANT';
  solde: number;
  devise: string;
  dateOuverture: string;
  statut: 'ACTIF' | 'BLOQUE' | 'CLOTURE';
}

export interface Transaction {
  id: number;
  montant: number;
  type: 'DEPOT' | 'RETRAIT' | 'VIREMENT_ENTRANT' | 'VIREMENT_SORTANT' | 'REMBOURSEMENT_CREDIT' | 'INTERET';
  libelle: string;
  reference: string;
  dateOperation: string;
  soldeApres: number;
}

export interface Credit {
  id: number;
  referenceCredit: string;
  montantAccorde: number;
  soldeRestant: number;
  mensualite: number;
  tauxInteret: number;
  dureeEnMois: number;
  dateDeblocage: string;
  dateEcheanceFinal: string;
  prochaineEcheance: string;
  statut: 'EN_COURS' | 'REMBOURSE' | 'EN_RETARD' | 'SOLDE';
  objet: string;
}

export interface UpdateMembreRequest {
  telephone: string;
  adresse: string;
  ville: string;
}

export interface ChangePasswordRequest {
  motDePasseActuel: string;
  nouveauMotDePasse: string;
}

export interface AdhesionRequest {
  prenom: string;
  nom: string;
  email: string;
  telephone: string;
  dateNaissance: string;
  ville: string;
  adresse: string;
  typeDocument: string;
  numeroDocument: string;
  nombreParts: number;
}

export interface AdhesionResponse {
  numeroDossier: string;
}

export interface OppositionRequest {
  numeroCarte: string;
  motif: string;
  telephone: string;
}

export interface OppositionResponse {
  numeroDossier: string;
}

export interface RendezVousRequest {
  prenom: string;
  nom: string;
  telephone: string;
  agence: string;
  motif: string;
  date: string;
  heure: string;
}

export interface RendezVousResponse {
  reference: string;
}
