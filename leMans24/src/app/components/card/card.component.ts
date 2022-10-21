import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Car } from 'src/app/models/car.model';
import { Pilot } from 'src/app/models/pilot.model';
import { Team } from 'src/app/models/team.model';
import { LeMan24Service } from 'src/app/shared/le-man24.service';

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

  constructor(private route: ActivatedRoute, private carServ: LeMan24Service) { }
  
  ngOnChanges(changes: SimpleChanges): void {
   console.log("dans on changes");
    // todo url est vide ????
    if (this.getParam() === "pilots"){
      console.log('pilot');
      this.pilot = (this.ptc as Pilot);
    } else
    if (this.getParam() === "teams"){
      console.log('team');
      this.team = (this.ptc as Team);
    } else
    if (this.getParam() === "cars"){
      console.log('cars');
      this.car = (this.ptc as Car);
    } 
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((param: ParamMap)=>{
      this.url = param.get('var') as string;
      console.log("url dans init " + this.url);      
    })   
  }

  getParam(): string{

    let result: string = "";
    this.route.paramMap.subscribe((param: ParamMap)=>{
      result =  param.get('var') as string;
     
    })

    return result;


  }

  getCarDetail(car: any):void{
    this.carServ.getCarById(car.id).subscribe(dataStream=>{
      this.carServ.carDetail.next(dataStream);
    })
  }

}
