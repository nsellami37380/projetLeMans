import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
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
  pilot: Pilot = new Pilot (0,[],'','',(new Date),0,0,'','');
  teamList!:Team[];
  id: number = 0;
  textBtnSubmit: string = "";
  
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
      this.url = this.pilot.photoList[0];
    }
  })
  
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
    if (this.id != 0)
      this.leMans24S.updatePilote(this.pilot);
    else
      this.leMans24S.addPilot(this.pilot);
   }


}
