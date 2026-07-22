import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RendezVousRequest, RendezVousResponse } from '../models';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class RendezVousService {
  private readonly API = environment.apiUrl;

  constructor(private http: HttpClient) {}

  prendreRendezVous(data: RendezVousRequest) {
    return this.http.post<RendezVousResponse>(`${this.API}/rendez-vous`, data);
  }
}
