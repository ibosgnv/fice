import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AdhesionRequest, AdhesionResponse } from '../models';

@Injectable({ providedIn: 'root' })
export class AdhesionService {
  private readonly API = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  creerAdhesion(data: AdhesionRequest) {
    return this.http.post<AdhesionResponse>(`${this.API}/adhesions`, data);
  }
}
