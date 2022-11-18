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

  private carList: Car[] = [];
  private pilotList: Pilot[] = [];
  private teamList: Team[] = [];

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

  private getData(): void {
    this.http.get<Team[]>(this.url + '/teams/all', this.requestOptions)
      .subscribe(teams => {
        this.teamList = teams;

        teams.forEach(team => {
        team.carList?.forEach(car => {
          this.carList.push(car);
        });

        team.pilotList?.forEach(pilot => {
          this.pilotList.push(pilot);
        });
      });
  })}

  getTeamList(){
    return this.teamList;
  }
  getCarList(){
    return this.carList;
  }
  getPilotList(){
    return this.pilotList;
  }
  addCar(car: Car): void {
      if (car.id == 0) {
      car.team.pilotList = undefined;
      car.team.carList = undefined;
      car.team.sponsorList = undefined;
      this.http.post<Car>(this.url + '/cars/add', car).subscribe({
        next: data => {
          this.carList.push(data);
          this.router.navigate(['/container-list', "cars"]);
        },
        error: error => { console.log("Erreur " + error) }
      },);
    } else {
      this.http.patch<Car>(this.url + '/cars', car).subscribe({
        next: data => { this.router.navigate(['/container-list', "cars"]); },
        error: error => { alert("Erreur " + error) }
      },);
    }
  }

  addTeam(team: Team): void {
    this.http.post<Team>(this.url + '/teams/add', team).subscribe({
      next: data => { 
        this.teamList.push(data);
        this.router.navigate(['/container-list', "teams"]);
      },
      error: error => { alert("Erreur " + error.message); }
    },);
  }

  addPilot(pilot: Pilot): void {

    (pilot.team as Team).pilotList = undefined;
    (pilot.team as Team).carList = undefined;
    (pilot.team as Team).sponsorList = undefined;
    this.http.post<Pilot>(this.url + '/pilots/add', pilot).subscribe({
      next: data => {
        this.pilotList.push(data);
        this.router.navigate(['/container-list', "pilots"]);
      },
      error: error => { alert("Erreur " + error.message) }
    },);
  }

  getCarById(id: number): Car {
    return this.carList.find(car => car.id == id) as Car;
  }

  getPilotById(id: number): Pilot {
    return this.pilotList.find(pilot => pilot.id == id) as Pilot;
  }

  getTeamById(id: number): Team {
    return this.teamList.find(team => team.id == id) as Team;
  }

  deleteCar(id: number): void {
    this.http.delete(this.url + '/cars/delete/' + id)
      .subscribe(() => {
        window.location.reload();
      })
  }

  deletePilot(id: number): void {
    this.http.delete<Pilot>(this.url + '/pilots/delete/' + id)
      .subscribe(() => {
        window.location.reload();
      })
  }

  deleteTeam(id: number): void {
    this.http.delete(this.url + '/teams/delete/' + id)
      .subscribe(() => {
        window.location.reload();
      })
  }

  updateCar(car: Car): void {
    this.http.patch(this.url + '/cars/update/' + car.id, car).subscribe({
      next: () => { this.router.navigate(['/container-list', "cars"]); },
      error: error => { console.log("Erreur " + error) }
    },);
  }

  updatePilote(pilot: Pilot): void {

    (pilot.team as Team).pilotList = undefined;
    (pilot.team as Team).carList = undefined;
    (pilot.team as Team).sponsorList = undefined;
    console.log(this.getJsonObject(pilot));
    

    this.http.put<Pilot>(this.url + '/pilots/update/' + pilot.id, pilot).subscribe({
      next: () => { this.router.navigate(['/container-list', "pilots"]); },
      error: error => { console.log("Erreur " + error.message + "\n" + pilot.id) }
    });
  }

  updateTeam(team: Team): void {
    console.log(team);
    team.carList = undefined;
    team.pilotList = undefined;
    team.sponsorList = undefined;
    this.http.put(this.url + '/teams/update/' + team.id, team).subscribe({
      next: (res) => {      
        this.router.navigate(['/container-list', "teams"]); },
      error: error => { console.log("Erreur " + error + team.name) }
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
        err => { console.log('Error occured during saving: ' + err) }
      );
  }

  getFile(nameFile: String): void {
    this.http.get('http://localhost:8080/picture/all',)
  }

  public getJsonObject(obj: object): string {
    let myString = JSON.stringify(obj, null, '\t'); // tab
    return myString;
  }
}