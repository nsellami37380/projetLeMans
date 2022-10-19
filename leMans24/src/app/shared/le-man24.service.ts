import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Car } from '../models/car.model';
import { Pilot } from '../models/pilot.model';
import { Team } from '../models/team.model';

@Injectable({
  providedIn: 'root'
})
export class LeMan24Service {

   // private url = "assets/leMans24-db.json";
   private url = "http://localhost:3000";

  private pilotList$ !: Observable<Pilot[]>;
  private teamList$ !: Observable<Team[]>;
  private carList$ !: Observable<Car[]>;


  constructor(private http: HttpClient) { 
    this.getDonnees()
  }

  private getDonnees():  void{
    this.pilotList$ =  this.http.get<Pilot[]>(this.url + '/pilots');
    this.teamList$ =  this.http.get<Team[]>(this.url + '/teams');
    this.carList$ =  this.http.get<Car[]>(this.url + '/cars');
  }

  getPilots(): Observable<Pilot[]>{
    return this.pilotList$;
  }

  getCars(): Observable<Car[]>{
    return this.carList$;
  }

  getTeams(): Observable<Team[]>{
    return this.teamList$;
  }

}
