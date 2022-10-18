import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class LeMan24Service {

  constructor(private http: HttpClient) { }

  getPilots(): Observable<any[]> {
    return this.http.get<any[]>("assets/leMans24-db.json");
  }
}
