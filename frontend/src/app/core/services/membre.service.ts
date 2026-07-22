import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Membre, UpdateMembreRequest, ChangePasswordRequest } from '../models';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class MembreService {
  private readonly API = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getMembre(id: number) {
    return this.http.get<Membre>(`${this.API}/membres/${id}`);
  }

  getAllMembres() {
    return this.http.get<Membre[]>(`${this.API}/admin/membres`);
  }

  updateMembre(id: number, data: UpdateMembreRequest) {
    return this.http.patch<Membre>(`${this.API}/membres/${id}`, data);
  }

  changePassword(id: number, data: ChangePasswordRequest) {
    return this.http.patch<void>(`${this.API}/membres/${id}/password`, data);
  }
}
