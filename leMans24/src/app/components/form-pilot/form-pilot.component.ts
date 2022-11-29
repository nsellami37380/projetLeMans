import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Car } from 'src/app/models/car.model';
import { Pilot } from 'src/app/models/pilot.model';
import { PilotPhoto } from 'src/app/models/PilotPhoto';
import { Team } from 'src/app/models/team.model';
import { LeMan24Service } from 'src/app/shared/le-man24.service';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-form-pilot',
  templateUrl: './form-pilot.component.html',
  styleUrls: ['./form-pilot.component.scss']
})
export class FormPilotComponent implements OnInit {

  pilot: Pilot = new Pilot (0,[],'','',(new Date),0,'','',undefined, undefined);
  teamList:Team[] = [];
  carList: Car[] = [];
  id: number = 0;
  teamId:number = 0;
  carId: number = 0;
  textBtnSubmit: string = "Ajouter";
  urlList: string[] = [];
  file !: File;
  title : String = "Ajouter un pilote";
  pilotBirth: string = '';
  
  constructor(
    private leMans24S: LeMan24Service,
    private route: ActivatedRoute,
    private datepipe: DatePipe
    ) { }

  ngOnInit(): void {
    this.teamList = this.leMans24S.getTeamList();
    this.carList = this.leMans24S.getCarsAvailable();
    this.route.paramMap.subscribe((param: ParamMap)=>{
      if (param.get('id') != null)
      {       
        this.id =  parseInt( param.get('id') as string);
        this.textBtnSubmit = "Modifier";
        this.pilot = this.leMans24S.getPilotById(this.id);
        this.title = "Modifier le pilote " + this.pilot.firstName;
        this.carList = this.leMans24S.getCarsAvailable(this.pilot.team?.id);
        if (this.pilot.car) this.carList.push(this.pilot.car);
        if (this.pilot.team) this.teamId = this.pilot.team.id;
        if (this.pilot.car) this.carId = this.pilot.car.id;        
        this.pilot.photoList.forEach(pilotPhoto => {
          this.urlList.push(pilotPhoto.urlPhoto);
          
        });
        this.pilotBirth = this.datepipe.transform(this.pilot.dateOfBirth, 'yyyy-MM-dd') as string;
      }
  })
 }

 teamChange(teamId: number): void{
  this.carList = this.leMans24S.getCarsAvailable(teamId);  
 }

  selectfile(event: any): void{
    if (event.target.files){
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0])
      this.file = event.target.files[0];
      reader.onload = (event: any) => {
       this.pilot.photoList.push(new PilotPhoto("/assets/" + this.file.name));   
       this.urlList.push(event.target.result)  
       this.leMans24S.uploadFile(this.file) 
      }  
    }
   }

   selectMainfile(event: any): void{
    if (event.target.files){
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0])
      this.file = event.target.files[0];
      reader.onload = (event: any) => {
        this.urlList.unshift(event.target.result);  
        this.pilot.photoList.unshift(new PilotPhoto("/assets/" + this.file.name));   
        this.leMans24S.uploadFile(this.file) 
      }  
    }
   }

   deleteImg(img: string){
    this.urlList = this.urlList.filter(url =>url != img);
    this.pilot.photoList = this.pilot.photoList.filter(pilotPhoto =>pilotPhoto.urlPhoto != img);
   
  }

   
  addPilot() {
    this.pilot.firstName.trim()
    
    if (this.teamId != 0) {
      this.pilot.team = this.leMans24S.getTeamById(this.teamId)
      if (this.carId > 0) {
        this.pilot.car = this.leMans24S.getCarById(this.carId);
      }else{
        this.pilot.car = undefined;
      }
      if (this.id != 0) {
        this.leMans24S.updatePilote(this.pilot);
      }
      else
        this.leMans24S.addPilot(this.pilot);
    }
  }

  getPlaceholder(event: Event) {
    (event.target as HTMLImageElement).src="/assets/pilot-img-main.png"
   }
}
