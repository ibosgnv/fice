import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Credit } from '../models';

@Injectable({ providedIn: 'root' })
export class CreditService {
  private readonly API = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getCredits(membreId: number) {
    return this.http.get<Credit[]>(`${this.API}/membres/${membreId}/credits`);
  }
}
