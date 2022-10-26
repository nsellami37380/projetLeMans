import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
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
id: number = 0;
textBtnSubmit: string = "Ajouter";

  constructor(
    private leMans24S: LeMan24Service,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.leMans24S.getPilots().subscribe(pilot => {this.pilotList = pilot});
 
    this.route.paramMap.subscribe((param: ParamMap)=>{

      if (param.get('id') != null)
      {
        this.id =  parseInt( param.get('id') as string);
        this.textBtnSubmit = "Modifier";
        this.team = this.leMans24S.getTeamById(this.id);
        this.url = this.team.logo;
      }
    })  
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

  addTeam(): void{
    if (this.id != 0)
      this.leMans24S.updateTeam(this.team);
    else
      this.leMans24S.addTeam(this.team);
  }


}
