import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Car } from 'src/app/models/car.model';
import { Pilot } from 'src/app/models/pilot.model';
import { Team } from 'src/app/models/team.model';
import { LeMan24Service } from 'src/app/shared/le-man24.service';

@Component({
  selector: 'app-form-pilot',
  templateUrl: './form-pilot.component.html',
  styleUrls: ['./form-pilot.component.scss']
})
export class FormPilotComponent implements OnInit {

  url:String='';
<<<<<<< HEAD
  pilot : Pilot = new Pilot (0,[],'','', new Date,0,'','',{} as Car, {} as Team);
=======
  pilot: Pilot = new Pilot (0,[],'','',(new Date),0,'','',undefined,undefined);
>>>>>>> 96bd30dac8bd9bfef2b64f5ea5c7700bfbd8dd2f

  teamList!:Team[];
  id: number = 0;
  teamId:number = 0;
  textBtnSubmit: string = "Ajouter";
  
  constructor(
    private leMans24S: LeMan24Service,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.leMans24S.getTeams().subscribe(team => {this.teamList = team});
    this.route.paramMap.subscribe((param: ParamMap)=>{

    if (param.get('id') != null)
    {
      this.id =  parseInt( param.get('id') as string);
      this.textBtnSubmit = "Modifier";
      this.pilot = this.leMans24S.getPilotById(this.id);
      this.url = this.pilot.photoList[0].urlPhoto;
    }
  })
 }

  selectfile(event: any): void{
    if (event.target.files){
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0])
     
      reader.onload = (event: any) => {
        this.url = event.target.result;
  
        this.pilot.photoList[0].urlPhoto = this.url;    

      }  
    }
   }
   
   addPilot(){
    if (this.teamId != 0){

      this.pilot.team = this.leMans24S.getTeamById(this.teamId)
    }

    let myString = JSON.stringify(this.pilot.team, null, '\n'); // tab
     console.log(myString);


    if (this.id != 0)
    {
      this.leMans24S.updatePilote(this.pilot);
    }
    else
      this.leMans24S.addPilot(this.pilot);
   }


}
