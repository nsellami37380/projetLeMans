import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
<<<<<<< HEAD
import { BehaviorSubject, filter } from 'rxjs';
=======
>>>>>>> 5d986f56ad77eeb74e1b9a981ef1963022e5da54
import { Observable } from 'rxjs/internal/Observable';

import { Car } from '../models/car.model';
import { Pilot } from '../models/pilot.model';
import { Team } from '../models/team.model';

@Injectable({
  providedIn: 'root'
})
export class LeMan24Service {

  private url = "http://localhost:3000";

  private pilotList$ !: Observable<Pilot[]>;
  private teamList$ !: Observable<Team[]>;
  private carList$ !: Observable<Car[]>;

  private carList !: Car[];
<<<<<<< HEAD
 
=======
  private PilotList !: Pilot[];
  private TeamList !: Team[];
>>>>>>> 5d986f56ad77eeb74e1b9a981ef1963022e5da54

  constructor(private http: HttpClient) { 
    this.getDataList()
  }

  private getDataList():  void{
    this.pilotList$ =  this.http.get<Pilot[]>(this.url + '/pilots');
    this.teamList$ =  this.http.get<Team[]>(this.url + '/teams');
    this.carList$ =  this.http.get<Car[]>(this.url + '/cars');
    this.carList$.subscribe(cars => this.carList = cars);
    this.pilotList$.subscribe(pilots => this.PilotList = pilots);
    this.teamList$.subscribe(teams => this.TeamList = teams ); 
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
    if (car.id == 0)
    {
    this.http.post<Car>(this.url + '/cars',car).subscribe({
      next: data => {console.log("data id " + data.id)},
      error: error => {console.log("Erreur " + error)}      
    },);
    } else
    {
      this.http.patch<Car>(this.url + '/cars',car).subscribe({
        next: data => {console.log("data id " + data.id)},
        error: error => {console.log("Erreur " + error)}      
      },);
    } 
  }
  

  addTeam(team: Team): void{
    this.http.post<Team>(this.url + '/teams',team).subscribe({
      next: data => {console.log("data id " + data.id)},
      error: error => {console.log("Erreur " + error)}      
    },);
  }

  addPilot(pilot: Pilot): void{ 
    this.http.post<Pilot>(this.url + '/pilots',pilot).subscribe({
      next: data => {console.log("data id " + data.id)},
      error: error => {console.log("Erreur " + error)}      
    },);
  }

  getCarById(id: number): Car {
    return  this.carList.find(car => car.id == id) as Car;
  }
<<<<<<< HEAD
  
=======

  getPilotById (id:number): Pilot{
    return this.PilotList.find(pilot => pilot.id == id)as Pilot;
  }

  getTeamById (id: number): Team{
  return this.TeamList.find(team => team.id == id) as Team;
  }
  
  deleteCar(id: number): void{
    this.http.delete(this.url + '/cars/'+id)
    .subscribe(() => window.location.reload());
  }
>>>>>>> 5d986f56ad77eeb74e1b9a981ef1963022e5da54
}