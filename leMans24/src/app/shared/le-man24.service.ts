import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

import { Car } from '../models/car.model';
import { Pilot } from '../models/pilot.model';
import { Team } from '../models/team.model';

@Injectable({
  providedIn: 'root'
})
export class LeMan24Service {

  private url = "http://192.168.182.122:3000";
   //private url = "http://localhost:3000";

  private pilotList$ !: Observable<Pilot[]>;
  private teamList$ !: Observable<Team[]>;
  private carList$ !: Observable<Car[]>;

  contentDetailed: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) { 
    this.getDonnees()
  }

  private getDonnees():  void{
    this.pilotList$ =  this.http.get<Pilot[]>(this.url + '/pilots');
    this.teamList$ =  this.http.get<Team[]>(this.url + '/teams');
    this.carList$ =  this.http.get<Car[]>(this.url + '/cars');

    //this.carList$.subscribe(cars => this.carList$ = cars);
 
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

  addCar(car: Car): void{ 

    this.http.post<Car>(this.url + '/cars',car).subscribe({
      next: data => {console.log("data id " + data.id)},
      error: error => {console.log("Erreur " + error)}      
    },);
  }

  getCarById(id: number): void {
    //return  this.carList.find(car => car.id == id) as Car;
  }
}
