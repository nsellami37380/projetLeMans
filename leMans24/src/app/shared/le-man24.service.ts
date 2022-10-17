import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Pilot } from '../models/pilot.model';

@Injectable({
  providedIn: 'root'
})
export class LeMan24Service {

  constructor(private http: HttpClient) { }

  getPilots(): Observable<Pilot[]> {
    return this.http.get<Pilot[]>("assets/leMans24-db.json");
  }
}
