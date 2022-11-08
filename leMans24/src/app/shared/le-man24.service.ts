import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

import { Car } from '../models/car.model';
import { Pilot } from '../models/pilot.model';
import { Team } from '../models/team.model';

@Injectable({
  providedIn: 'root'
})
export class LeMan24Service {

  private url = "http://localhost:8080";

  private pilotList$ !: Observable<Pilot[]>;
  private teamList$ !: Observable<Team[]>;
  private carList$ !: Observable<Car[]>;

  private carList !: Car[];
  private PilotList !: Pilot[];
  private TeamList !: Team[];

  private optionRequete = {
    headers: new HttpHeaders({ 
      'Access-Control-Allow-Origin':'*',
    })
  }

  constructor(
    private http: HttpClient,
    private router: Router) { 
    this.getData()
  }

  private getData():  void{
    this.pilotList$ =  this.http.get<Pilot[]>(this.url + '/pilots/all');
    this.teamList$ =  this.http.get<Team[]>(this.url + '/teams/all');
    this.carList$ =  this.http.get<Car[]>(this.url + '/cars/all');
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
    this.http.post<Car>(this.url + '/cars/add',car).subscribe({
      next: data => {this.router.navigate(['/container-list',"cars"]);},
      error: error => {console.log("Erreur " + error)}      
    },);
    } else
    {
      this.http.patch<Car>(this.url + '/cars',car).subscribe({
        next: data => {this.router.navigate(['/container-list',"cars"]);},
        error: error => {alert("Erreur " + error)}      
      },);
    } 
  }  

  addTeam(team: Team): void{
    this.http.post<Team>(this.url + '/teams/add',team).subscribe({
      next: data => {this.router.navigate(['/container-list',"teams"]);},
      error: error => {alert("Erreur " + error)}      
    },);
  }

  addPilot(pilot: Pilot): void{ 
    this.http.post<Pilot>(this.url + '/pilots/add',pilot, this.optionRequete).subscribe({
      next: data => {this.router.navigate(['/container-list',"pilots"]);},
      error: error => {alert("Erreur " + error)
      console.log(pilot);}      
    },);
  }

  getCarById(id: number): Car {
    return  this.carList.find(car => car.id == id) as Car;
  }


  getPilotById (id:number): Pilot{
    return this.PilotList.find(pilot => pilot.id == id)as Pilot;
  }

  getTeamById (id: number): Team{
  return this.TeamList.find(team => team.id == id) as Team;
  }
 
  deleteCar(id: number): void{
    this.http.delete(this.url + '/cars/delete/'+id)
    .subscribe(() => {
         window.location.reload();
    })
  }
    
  deletePilot(id: number): void{
    this.http.delete<Pilot>(this.url + '/pilots/delete/'+id)
    .subscribe(() => {
        window.location.reload();
    })
  }
    
  deleteTeam(id: number): void{
    this.http.delete(this.url + '/teams/delete/'+id)
    .subscribe(() => {
      window.location.reload();
    })
  }

  updateCar(car: Car): void{
    this.http.patch(this.url + '/cars/update/' + car.id, car).subscribe({
      next: () => {this.router.navigate(['/container-list',"cars"]);},
      error: error => {console.log("Erreur " + error)}      
    },);
  }

  updatePilote(pilot: Pilot): void{
    this.http.put<Pilot>(this.url + '/pilots/update/' + pilot.id, pilot).subscribe({
      next: () => {this.router.navigate(['/container-list',"pilots"]);},
      error: error => {console.log("Erreur " + error.message + "\n" + pilot.id)}  
    });
  }

  updateTeam(team: Team): void{
    this.http.patch(this.url + '/teams/update/' + team.id, team ).subscribe({
      next: () => {this.router.navigate(['/container-list',"teams"]);},
      error: error => {console.log("Erreur " + error + team.name)}      
    },);
  }

  
}