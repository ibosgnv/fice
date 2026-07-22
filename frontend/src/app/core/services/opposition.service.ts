import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OppositionRequest, OppositionResponse } from '../models';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class OppositionService {
  private readonly API = environment.apiUrl;

  constructor(private http: HttpClient) {}

  creerOpposition(data: OppositionRequest) {
    return this.http.post<OppositionResponse>(`${this.API}/oppositions`, data);
  }
}
