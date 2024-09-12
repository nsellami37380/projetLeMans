import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Car } from 'src/app/models/car.model';
import { Pilot } from 'src/app/models/pilot.model';
import { Team } from 'src/app/models/team.model';
import { LeMan24Service } from 'src/app/shared/le-man24.service';

@Component({
  selector: 'app-pilot-details',
  templateUrl: './pilot-details.component.html',
  styleUrls: ['./pilot-details.component.scss']
})
export class PilotDetailsComponent implements OnInit {
  
  id:number = 0;
  pilotList: Pilot[] = [];
  pilot !: Pilot;
  car !: Car;
  team !: Team;
  
  

  constructor(private route: ActivatedRoute,
    private leMan24S: LeMan24Service) { }


  ngOnInit(): void {
 
    this.route.paramMap.subscribe((param: ParamMap)=>{
      this.id = parseInt(param.get("id") as string);
      if(this.id){
        this.leMan24S.getData$().subscribe(()  =>  {
        this.pilot = this.leMan24S.getPilotById(this.id);
      
         if(this.pilot.car)  this.car = this.leMan24S.getCarById(this.pilot.car?.id);
      
        if(this.pilot.team) this.team = this.leMan24S.getTeamById(this.pilot.team?.id);
      })}
    })
  }

}
