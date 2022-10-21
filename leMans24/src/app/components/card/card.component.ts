import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Car } from 'src/app/models/car.model';
import { Pilot } from 'src/app/models/pilot.model';
import { Team } from 'src/app/models/team.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit, OnChanges{

  url: string = ' a ';
  

  car: Car = new Car(0,'','','','',0,0,'',(new Team(0,'','',[],[],0,'')),0);

 
  pilot: Pilot = new Pilot (0,[],'','',(new Date),0,(new Team(0,'','',[],[],0,'')),'','');


  team: Team = new Team(0,'','',[],[],0,'');

  @Input()
  ptc : Car | Pilot | Team = this.car;

  constructor(private route: ActivatedRoute) { }
  
  ngOnChanges(changes: SimpleChanges): void {
    // todo url est vide ????
    if (this.getParam() === "pilots"){
      this.pilot = (this.ptc as Pilot);
    } else
    if (this.getParam() === "teams"){
      this.team = (this.ptc as Team);
    } else
    if (this.getParam() === "cars"){
      this.car = (this.ptc as Car);
    } 
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((param: ParamMap)=>{
      this.url = param.get('var') as string;     
    })   
  }

  getParam(): string{

    let result: string = "";
    this.route.paramMap.subscribe((param: ParamMap)=>{
      result =  param.get('var') as string;
     
    })

    return result;


  }

}
