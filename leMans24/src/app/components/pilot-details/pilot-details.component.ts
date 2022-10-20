import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
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
  pilot: Pilot | undefined = new Pilot (0,[],'','',(new Date),0,(new Team(0,'','',[],[],0,'')),'','');

  constructor(private route: ActivatedRoute,
    private leMan24S: LeMan24Service) { }


  ngOnInit(): void {
    this.route.paramMap.subscribe((param: ParamMap)=>{
      this.id = parseInt(param.get("id") as string);
      if(this.id){
        this.leMan24S.getPilots().subscribe(pilots => {
          this.pilotList = pilots;
          this.pilot = this.pilotList.find(pilot => pilot.id === this.id)
        });

      }
    }) 

   
  }

}
