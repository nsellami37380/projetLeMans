import { Component, OnInit } from '@angular/core';
import { Pilot } from 'src/app/models/pilot.model';
import { Team } from 'src/app/models/team.model';
import { LeMan24Service } from 'src/app/shared/le-man24.service';

@Component({
  selector: 'app-form-team',
  templateUrl: './form-team.component.html',
  styleUrls: ['./form-team.component.scss']
})
export class FormTeamComponent implements OnInit {

team: Team = new Team(0,'','',[],[],0,'');
url:string ='';
pilotList!: Pilot[];

  constructor(private leMans24S: LeMan24Service) { }

  ngOnInit(): void {
    this.leMans24S.getPilots().subscribe(pilot => {this.pilotList = pilot});
  }

  addTeam(): void{
    this.leMans24S.addTeam(this.team);
  }

  selectfile(event: any): void{
    if (event.target.files){
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0])
     
      reader.onload = (event: any) => {
        this.url = event.target.result;
  
        this.team.logo = this.url;     
      }
  
    }
   }

}
