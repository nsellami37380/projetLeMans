import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Car } from 'src/app/models/car.model';
import { ERole } from 'src/app/models/enum/ERole.enum';
import { Pilot } from 'src/app/models/pilot.model';
import { Team } from 'src/app/models/team.model';
import { AuthService } from 'src/app/shared/auth.service';
import { LeMan24Service } from 'src/app/shared/le-man24.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit, OnChanges{

  url: string = ' '; 

  car : Car= new Car(0,[],'','',0,0,0,'',(new Team(0,'','',0,'',[],[],[])),(new Pilot(0,[],'','',(new Date),0,'','',undefined,undefined)));
  pilot: Pilot = new Pilot (0,[],'','',(new Date),0,'','',undefined,undefined);

  team: Team = new Team(0,'','',0,'',[],[],[]);

  isAdmin: boolean = false;

  @Input()
  ptc : Car | Pilot | Team = this.car;

  constructor(
    private route: ActivatedRoute,
    private leMan24S: LeMan24Service,
    private authS:AuthService,
    private router: Router) { }
  
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

    this.authS.appUser$.subscribe(appuser => {
      this.isAdmin = appuser.roleList.includes(ERole.ROLE_ADMIN)
    })
  }

  getParam(): string{
    let result: string = "";
    this.route.paramMap.subscribe((param: ParamMap)=>{
      result =  param.get('var') as string;     
    })
    return result;
  }

  delete(): void {
    switch(this.getParam()){
      case "pilots":
        if (window.confirm("Voulez vraiment supprimer le pilote " +(this.ptc as Pilot).lastName +" ?"))
        {
          this.leMan24S.deletePilot((this.ptc as Pilot).id) ;          
        }
        break;
      case "teams":
        if (window.confirm("Voulez vraiment supprimer l'équipe " +(this.ptc as Team).name +" ?"))
        {
          this.leMan24S.deleteTeam((this.ptc as Team).id) ;         
        }
        break;
      case "cars":
        if (window.confirm("Voulez vraiment supprimer la voiture " +(this.ptc as Car).modelName +" ?"))
        {
          this.leMan24S.deleteCar((this.ptc as Car).id) ;        
        }
        break;
    }
  }

  modify(): void {
    switch(this.getParam()){
      case "pilots":
        this.router.navigate(['/updateCar',(this.ptc as Pilot).id]);
        break;
      case "teams":
        this.router.navigate(['/updateCar',(this.ptc as Pilot).id]);
        break;
      case "cars":
        this.router.navigate(['/updateCar',(this.ptc as Pilot).id]);
        break;
    }
  }
}
