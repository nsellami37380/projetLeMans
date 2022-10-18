import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Car } from 'src/app/models/car.model';
import { Pilot } from 'src/app/models/pilot.model';
import { Team } from 'src/app/models/team.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  url: string = '';

  @Input()
  car: Car = new Car(0,'','','','',0,0,'',(new Team(0,'','',[],[],0,'')),0);

  @Input()
  pilot: Pilot = new Pilot (0,[],'','',(new Date),0,(new Team(0,'','',[],[],0,'')),'','');

  @Input()
  team: Team = new Team(0,'','',[],[],0,'');

  @Input()
  ptc !: Car | Pilot | Team | null | undefined;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((param: ParamMap)=>{
      this.url = param.get('var') as string;
    })
  }

}
