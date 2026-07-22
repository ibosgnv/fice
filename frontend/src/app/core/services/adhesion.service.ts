import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AdhesionRequest, AdhesionResponse } from '../models';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AdhesionService {
  private readonly API = environment.apiUrl;

  constructor(private http: HttpClient) {}

  creerAdhesion(data: AdhesionRequest) {
    return this.http.post<AdhesionResponse>(`${this.API}/adhesions`, data);
  }
}
