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

  private browseTeam(team: Team){

    if (!team.id) return;

    this.teamList.push(team);
    if (team.pilotList) this.browsePilotList(team.pilotList);
    if (team.carList) this.browseCarList(team.carList);

  }

  private browsePilotList(pilotList: Pilot[]): void{
    pilotList.forEach(pilot => {
      if (!pilot.id) return;
      if (pilot.car) {
        if (pilot.car.team){
          this.browseTeam(pilot.car.team);
        }
        this.carList.push(pilot.car);
      }
      if (pilot.team) {
        if (pilot.team.id){
          this.pilotList.push(pilot);
          this.browseTeam(pilot.team);
        }
        else{
          let teamId: any = pilot.team;
          pilot.team = this.getTeamById(teamId as number)
          this.pilotList.push(pilot);
        }
      }
    })
  }

  private browseCarList(carList: Car[]): void{
    carList.forEach(car => {
      if (!car.id)  return;  
      if (car.team){
        if (car.team.id){
          this.carList.push(car);
          this.browseTeam(car.team);
        } else{
          let teamId: any = car.team;
          car.team = this.getTeamById(teamId as number);
          this.carList.push(car);
        }
      }
    });
  }

  private getData(): void {
    this.http.get<Team[]>(this.url + '/teams/all')
      .subscribe(teams => {
        teams.forEach(team => {          
          this.browseTeam(team);
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
    if(car.team)
    {
      car.team.pilotList = undefined;
      car.team.carList = undefined;
      car.team.sponsorList = undefined;
    }
      this.http.post<Car>(this.url + '/cars/add', car).subscribe({
        next: data => {
          this.carList.push(data);
          this.router.navigate(['/container-list', "cars"]);
        },
        error: error => { console.log("Erreur " + error) }
      },);     
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
    let carId = 0;
    if (pilot.car)  {carId = pilot.car.id;}
    pilot.car = undefined;
    this.http.post<Pilot>(this.url + '/pilots/add/' + carId, pilot).subscribe({
      next: data => {

        if (!data.team?.id){
          let teamId: any = data.team;
          data.team = this.getTeamById(teamId);
          this.pilotList.push(data);
        }
        
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
       // window.location.reload();
       this.removeObjectWithId(this.carList,id);
      })
  }

  deletePilot(id: number): void {
    this.http.delete<Pilot>(this.url + '/pilots/delete/' + id)
      .subscribe(() => {
        this.removeObjectWithId(this.pilotList,id);
      })
  }
  removeObjectWithId(arr : Array<any>, id: number) {
    const objWithIdIndex = arr.findIndex((obj) => obj.id === id);
    arr.splice(objWithIdIndex, 1);
  
    return arr;
  }
  deleteTeam(id: number): void {
    this.http.delete(this.url + '/teams/delete/' + id)
      .subscribe((data) => {
      this.removeObjectWithId(this.teamList,id);
      this.getData();
        //window.location.reload();
      })
  }

  updateCar(car: Car): void {
// On travaille sur une copy sinon l'original n'aura plus de team
    let cloneCar = { ...car}

    cloneCar.carPhotoList.forEach(photo=> {
      photo.id = undefined;
      photo.car = undefined;
    } )
    let teamId = cloneCar.team?.id as number;
    cloneCar.team = undefined;

    this.http.put(this.url + '/cars/update/' + car.id + '/' + teamId, cloneCar).subscribe({
      next: () => { 
        this.router.navigate(['/container-list', "cars"]); },
      error: error => { console.log("Erreur " + error) }
    },);
  }

  updatePilote(pilot: Pilot): void {

    let clonePilot = { ...pilot}

    clonePilot.photoList.forEach(photo=> {
      photo.id = undefined;
      photo.pilot = undefined;
    } )
    let teamId = clonePilot.team?.id as number;
    clonePilot.team = undefined;

    clonePilot.team = undefined; 
    let carId = 0;
    if (clonePilot.car) carId = clonePilot.car.id;
    clonePilot.car = undefined;  

    this.http.put<Pilot>(this.url + '/pilots/update/' + pilot.id + '/' + teamId + '/' + carId, clonePilot).subscribe({
      next: () => { this.router.navigate(['/container-list', "pilots"]); },
      error: error => { console.log("Erreur " + error.message + "\n" + pilot.id) }
    });
  }

  updateTeam(team: Team): void {    
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
    if (file == undefined) return;
    const uploadData = new FormData();
    uploadData.append('myFile', file, file.name);
    this.http.post('http://localhost:8080/picture/add', uploadData)
      .subscribe(
        err => { console.log('Error occured during saving: ' + err) }
      );
  }

  getFile(nameFile: String): void {
    this.http.get('http://localhost:8080/picture/all',)
  }

  public getCarsAvailable(teamId: number = 0): Car[]{
    let result: Car[] = this.getCarList();
    if (teamId  > 0) result = result.filter(car => car.team?.id == teamId);
    result = result.filter(car => car.pilot == undefined);
    return result;

  }

  public getJsonObject(obj: object): string {
    let myString = JSON.stringify(obj, null, '\t'); // tab
    return myString;
  }
}