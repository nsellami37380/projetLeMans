import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Car } from 'src/app/models/car.model';
import { Pilot } from 'src/app/models/pilot.model';
import { Team } from 'src/app/models/team.model';
import { LeMan24Service } from 'src/app/shared/le-man24.service';

@Component({
  selector: 'app-container-list',
  templateUrl: './container-list.component.html',
  styleUrls: ['./container-list.component.scss']
})
export class ContainerListComponent implements OnInit {

  //objectList: any = [];

   pilotList: Pilot[] = [];
   teamList: Team[] = [];
   carList: Car[] = [];

  //ptcList: Pilot[] | Team[] | Car[] = [];
  title: string = "";

  url: string = '';

  constructor(private route: ActivatedRoute,
    private leMan24S: LeMan24Service) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((param: ParamMap)=>{
      this.url = param.get('var') as string;
      this.getList();
    })    }


    
    getList(): void{
      if (this.url ==='pilots'){
         this.leMan24S.getPilots().subscribe(pilots  => this.pilotList = pilots)
         //this.leMan24S.getPilots().subscribe(pilots  => this.ptcList = pilots)
        this.title = "Listes des pilotes";
      } else
      if (this.url ==='cars'){
         //this.leMan24S.getCars().subscribe(cars  => this.ptcList = cars)
        this.title = "Listes des voitures";
         this.leMan24S.getCars().subscribe(cars  => this.carList = cars)
      } else
      if (this.url ==='teams'){
        this.leMan24S.getTeams().subscribe(teams  => this.teamList = teams)
        this.title = "Listes des écuries";
         //this.leMan24S.getTeams().subscribe(teams  => this.ptcList = teams)
      };


  }
}
