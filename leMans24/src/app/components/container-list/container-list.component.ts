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

  resultFilter: string = ''
  ptcList: Pilot[] | Team[] | Car[] = [];
  carList: Car[] = [];
  pilotList: Pilot[] = [];
  teamList: Team[] = [];
  title: string = "";
  // ptcList contient la liste originale
  // newPtcList est la liste utilisée (notemment après filtre)
  newPtcList: Pilot[] | Team[] | Car[] = this.ptcList;

  url: string = '';

  constructor(private route: ActivatedRoute,
    private leMan24S: LeMan24Service) { }

  ngOnInit(): void {
    this.leMan24S.getData$().subscribe(()  =>  this.getList())
    
  }

  getList(): void {

      this.route.paramMap.subscribe((param: ParamMap) => {
        this.url = param.get('var') as string;
        if (this.url === 'pilots') {
          this.title = "Listes des pilotes";
          this.ptcList = this.leMan24S.getPilotList();
        } else if (this.url === 'cars') {
          this.title = "Listes des voitures";
          this.ptcList = this.leMan24S.getCarList();
        } else if (this.url === 'teams') {
          this.title = "Listes des écuries";
          this.ptcList = this.leMan24S.getTeamList()
        };
        this.newPtcList = this.ptcList;
      })
    
  }

  filterList(event: string): void {
    this.resultFilter = event.toLowerCase();
    if (this.url === 'pilots') {
      this.newPtcList = (this.ptcList as Pilot[]).filter(pilot => pilot.firstName.toLowerCase().includes(this.resultFilter));
    } else
      if (this.url === 'cars') {
        this.newPtcList = (this.ptcList as Car[]).filter(text => text.modelName.toLowerCase().includes(this.resultFilter));
      } else
        if (this.url === 'teams') {
          this.newPtcList = (this.ptcList as Team[]).filter(text => text.name.toLowerCase().includes(this.resultFilter));
        }
  }
}