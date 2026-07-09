import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OppositionRequest, OppositionResponse } from '../models';

@Injectable({ providedIn: 'root' })
export class OppositionService {
  private readonly API = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  creerOpposition(data: OppositionRequest) {
    return this.http.post<OppositionResponse>(`${this.API}/oppositions`, data);
  }
}
