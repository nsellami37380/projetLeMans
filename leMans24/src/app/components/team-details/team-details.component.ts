import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
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
  team!: Team;
  pilot!: Pilot;

  constructor(private route: ActivatedRoute, private leMans24S: LeMan24Service) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap ) => {
      this.teamId=parseInt(params.get("id")as string)
      if(this.teamId){
        this.team=this.leMans24S.getTeamById(this.teamId);
      }
    });
  }

}
