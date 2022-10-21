import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';

import { Car } from '../models/car.model';
import { Pilot } from '../models/pilot.model';
import { Team } from '../models/team.model';

@Injectable({
  providedIn: 'root'
})
export class LeMan24Service {

  //private url = "assets/leMans24-db.json";
  //private url = "http://localhost:3000";
  private url = "http://192.168.182.122:3000";


  //getPilots(): Observable<any[]> {
   // return this.http.get<any[]>("assets/leMans24-db.json");

  private pilotList$ !: Observable<Pilot[]>;
  private teamList$ !: Observable<Team[]>;
  private carList$ !: Observable<Car[]>;

  carDetail: BehaviorSubject<any> = new BehaviorSubject<any>(null);


  constructor(private http: HttpClient) { 
    this.getData()
  }

  private getData():  void{
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

  getCarById(url: string):Observable<any>{
    return this.http.get(url);
  }
}
