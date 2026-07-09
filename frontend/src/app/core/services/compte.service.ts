import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Compte, Transaction } from '../models';

@Injectable({ providedIn: 'root' })
export class CompteService {
  private readonly API = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getComptes(membreId: number) {
    return this.http.get<Compte[]>(`${this.API}/membres/${membreId}/comptes`);
  }

  getTransactions(membreId: number, limit = 20) {
    return this.http.get<Transaction[]>(
      `${this.API}/membres/${membreId}/transactions?limit=${limit}`
    );
  }

  getTransactionsByCompte(compteId: number, limit = 20) {
    return this.http.get<Transaction[]>(
      `${this.API}/comptes/${compteId}/transactions?limit=${limit}`
    );
  }
}
