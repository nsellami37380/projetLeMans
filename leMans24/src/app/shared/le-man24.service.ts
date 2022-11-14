import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConditionalExpr } from '@angular/compiler';
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

  public carList : Car[] = [];
  private pilotList : Pilot[] = [];
  private teamList : Team[] = [];

  constructor(
    private http: HttpClient,
    private router: Router) { 
    this.getData()
  }

   headerDict = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Headers': 'Content-Type',
  }

   requestOptions = {                                                                                                                                                                                 
    headers: new HttpHeaders(this.headerDict), 
  };

   private getData():  void{
    this.pilotList$ =  this.http.get<Pilot[]>(this.url + '/pilots/all', this.requestOptions);
    this.teamList$ =  this.http.get<Team[]>(this.url + '/teams/all', this.requestOptions);
    this.carList$ =  this.http.get<Car[]>(this.url + '/cars/all', this.requestOptions);
    this.carList$.subscribe(cars => 
      {
       
        let car : Car = cars[0];
        this.carList.push(car);
        
        let newCars: Car[] | undefined = car.team.carList;        
        for (let index = 1; index < (newCars as Car[]).length; index++) {
          this.carList.push((newCars as Car[])[index])          
        }
        console.log((this.getJsonObject(this.carList)));        
      });
    this.pilotList$.subscribe(pilots => this.pilotList = pilots);
    this.teamList$.subscribe(teams => this.teamList = teams ); 
  }

  getPilots(): Observable<Pilot[]>{
    return this.pilotList$;
  }

  getCars(): Observable<Car[]>{
    return this.http.get<Car[]>(this.url + '/cars/all', this.requestOptions);
  }

  getTeams(): Observable<Team[]>{
    return this.teamList$;
  }

  addCar(car: Car): void{ 
    console.log("MyCar    " + this.getJsonObject(car));
    if (car.id == 0)
    {
      car.team.pilotList = undefined;
    
      car.team.carList = undefined;
      car.team.sponsorList = undefined;

      
    this.http.post<Car>(this.url + '/cars/add',car).subscribe({
      next: data => {
        // this.carList$ =  this.http.get<Car[]>(this.url + '/cars/all', this.requestOptions);
        // this.carList$.subscribe(cars => this.carList = cars);
        this.getData();
        this.router.navigate(['/container-list',"cars"]);},
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
      next: data => {
        this.teamList$ =  this.http.get<Team[]>(this.url + '/teams/all', this.requestOptions);
        this.teamList$.subscribe(teams => this.teamList = teams );
        this.router.navigate(['/container-list',"teams"]);},
      error: error => {alert("Erreur " + error.message);}      
    },);
  }

  addPilot(pilot: Pilot): void{
    this.http.post<Pilot>(this.url + '/pilots/add',pilot).subscribe({
      next: data => {
        this.pilotList$ =  this.http.get<Pilot[]>(this.url + '/pilots/all', this.requestOptions);
        this.pilotList$.subscribe(pilots => this.pilotList = pilots);
        this.router.navigate(['/container-list',"pilots"]);},
      error: error => {alert("Erreur " + error.message)}      
    },);
  }

  getCarById(id: number): Car {
    return  this.carList.find(car => car.id == id) as Car;
  }

  getPilotById (id:number): Pilot{
    return this.pilotList.find(pilot => pilot.id == id)as Pilot;
  }

  getTeamById (id: number): Team{
  return this.teamList.find(team => team.id == id) as Team;
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

  uploadFile(file: File): void {
    const uploadData = new FormData();
    // let imgURL: any;
    // let receivedImageData: any;
    // let base64Data: any;
    // let convertedimage: any;

    uploadData.append('myFile', file, file.name);

    this.http.post('http://localhost:8080/picture/add', uploadData) 
    .subscribe(
      // res => {console.log(res);
        // receivedImageData = res;
        // base64Data = receivedImageData.pic;
        // convertedimage = 'data:image/jpeg;base64,'+base64Data;},
      err => {console.log('Error occured during saving: ' + err)}
    );
  }

  getFile(nameFile: String): void {
    this.http.get('http://localhost:8080/picture/all',   )
  }

  public getJsonObject(obj: object):string {
    let myString = JSON.stringify(obj, null, '\t'); // tab
    return myString;
  }  
}