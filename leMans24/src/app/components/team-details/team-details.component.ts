import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Car } from 'src/app/models/car.model';
import { Pilot } from 'src/app/models/pilot.model';
import { Team } from 'src/app/models/team.model';
import { LeMan24Service } from 'src/app/shared/le-man24.service';

@Component({
  selector: 'app-team-details',
  templateUrl: './team-details.component.html',
  styleUrls: ['./team-details.component.scss']
})
export class TeamDetailsComponent implements OnInit {

  teamId: number = 0;
  team : Team = new Team(0,'','',0,'',[],[],[]);
  pilot: Pilot = new Pilot(0,[],'','', new Date,0,'','',{} as Car,{} as Team);
  pilotListFilteredByTeam: Pilot[] = [];
  carListFilteredByTeam: Car [] = [];
  responsiveOptions: any;

  constructor(private route: ActivatedRoute, private leMans24S: LeMan24Service) { 

      this.responsiveOptions = [
        {
            breakpoint: '1024px',
            numVisible: 3,
            numScroll: 3
        },
        {
            breakpoint: '768px',
            numVisible: 2,
            numScroll: 2
        },
        {
            breakpoint: '560px',
            numVisible: 1,
            numScroll: 1
        }
    ];
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap ) => {
      this.teamId=parseInt(params.get("id")as string)
      if(this.teamId){
        this.leMans24S.getData$().subscribe(()  =>  {
        this.team=this.leMans24S.getTeamById(this.teamId);
       
      


        this.carListFilteredByTeam = this.leMans24S.getCarList().filter(car=>car.team?.id==this.team.id);


       this.pilotListFilteredByTeam = this.leMans24S.getPilotList().filter(pilot=>(pilot.team as Team).id==this.team.id);
      })
      }
    });
    
  }


}
