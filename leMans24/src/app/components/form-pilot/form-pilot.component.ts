import { Component, OnInit } from '@angular/core';
import { Pilot } from 'src/app/models/pilot.model';
import { Team } from 'src/app/models/team.model';
import { LeMan24Service } from 'src/app/shared/le-man24.service';

@Component({
  selector: 'app-form-pilot',
  templateUrl: './form-pilot.component.html',
  styleUrls: ['./form-pilot.component.scss']
})
export class FormPilotComponent implements OnInit {

  url:string='';
  pilot: Pilot = new Pilot (0,[],'','',(new Date),0,(new Team(0,'','',[],[],0,'')),'','');
  teamList!:Team[];

  constructor(private leMans24S: LeMan24Service) { }

  ngOnInit(): void {
    this.leMans24S.getTeams().subscribe(team => {this.teamList = team});
  }

  selectfile(event: any): void{
    if (event.target.files){
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0])
     
      reader.onload = (event: any) => {
        this.url = event.target.result;
  
        this.pilot.photoList.push(this.url);     
      }
  
    }
   }
   
   addPilot(){
    this.leMans24S.addPilot(this.pilot);
   }


}
