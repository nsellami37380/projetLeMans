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
  title: string = "";
  newPtcList: Pilot[] | Team[] | Car[] = this.ptcList;

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
         this.leMan24S.getPilots().subscribe(pilots  => {
          this.ptcList = pilots;
          this.newPtcList = this.ptcList;
          console.log(this.ptcList);
        });
        this.title = "Listes des pilotes";
        
      } else
      if (this.url ==='cars'){
         this.leMan24S.getCars().subscribe(
          cars  => {
            if (cars.length > 0){           
            let car : Car =cars[0];
            this.carList.push(car);
            let newCars: Car[] | undefined = car.team.carList;        
            for (let index = 1; index < (newCars as Car[]).length; index++) {
              this.carList.push((newCars as Car[])[index])          
            }
            this.ptcList = this.carList, this.newPtcList = this.ptcList;

         }
        })


        this.title = "Listes des voitures";  
     
      } else
      if (this.url ==='teams'){ 
        this.leMan24S.getTeams().subscribe(teams  => {this.ptcList = teams, this.newPtcList = this.ptcList;})       
        this.title = "Listes des écuries";        
      };
  }

  filterList(event: string): void {
    this.resultFilter = event.toLowerCase();
    if (this.url ==='pilots'){          
      this.newPtcList = (this.ptcList as Pilot[]).filter(pilot => pilot.firstName.toLowerCase().includes(this.resultFilter));
    } else
    if (this.url ==='cars'){
      this.newPtcList = (this.ptcList as Car[]).filter(text => text.modelName.toLowerCase().includes(this.resultFilter));       
    } else
    if (this.url ==='teams'){ 
      this.newPtcList = (this.ptcList as Team[]).filter(text => text.name.toLowerCase().includes(this.resultFilter));  
    }
    console.log(this.newPtcList);
    
  }
}


