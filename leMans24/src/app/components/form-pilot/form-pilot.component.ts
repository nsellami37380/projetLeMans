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

  url:String='';
  pilot: Pilot = new Pilot (0,[],'','',(new Date),0,'','',undefined, undefined);
  teamList:Team[] = [];
  id: number = 0;
  teamId:number = 0;
  textBtnSubmit: string = "Ajouter";
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
    this.route.paramMap.subscribe((param: ParamMap)=>{

    if (param.get('id') != null)
    {
      this.title = "Modifier un pilote";
      this.id =  parseInt( param.get('id') as string);
      this.textBtnSubmit = "Modifier";
      this.pilot = this.leMans24S.getPilotById(this.id);
      if (this.pilot.team) this.teamId = this.pilot.team.id;
      this.url = this.pilot.photoList[0].urlPhoto;
      this.pilotBirth = this.datepipe.transform(this.pilot.dateOfBirth, 'yyyy-MM-dd') as string;
    }
  })
 }

  selectfile(event: any): void{
    if (event.target.files){
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0])
      this.file = event.target.files[0];
      reader.onload = (event: any) => {
        this.url = event.target.result;
  
       this.pilot.photoList.unshift(new PilotPhoto("/assets/" + this.file.name));   
       this.leMans24S.uploadFile(this.file) 

      }  
    }
   }
   
  addPilot() {
    if (this.teamId != 0) {
      this.pilot.team = this.leMans24S.getTeamById(this.teamId)

      if (this.id != 0) {
        this.leMans24S.updatePilote(this.pilot);
      }
      else
        this.leMans24S.addPilot(this.pilot);
    }
  }
}
