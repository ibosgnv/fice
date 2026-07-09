import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RendezVousRequest, RendezVousResponse } from '../models';

@Injectable({ providedIn: 'root' })
export class RendezVousService {
  private readonly API = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  prendreRendezVous(data: RendezVousRequest) {
    return this.http.post<RendezVousResponse>(`${this.API}/rendez-vous`, data);
  }
}
