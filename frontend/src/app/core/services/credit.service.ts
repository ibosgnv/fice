import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Credit } from '../models';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CreditService {
  private readonly API = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getCredits(membreId: number) {
    return this.http.get<Credit[]>(`${this.API}/membres/${membreId}/credits`);
  }
}
