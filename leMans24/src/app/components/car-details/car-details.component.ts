import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Car } from 'src/app/models/car.model';
import { CarPhoto } from 'src/app/models/carPhoto.model';
import { Pilot } from 'src/app/models/pilot.model';
import { Team } from 'src/app/models/team.model';

import { LeMan24Service } from 'src/app/shared/le-man24.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.scss']
})
export class CarDetailsComponent implements OnInit {

  car: Car = new Car(0,[],'','',0,0,0,'',{} as Team,{} as Pilot);
  id: number= 0;
  carPics: CarPhoto[] = [];
  responsiveOptions: any;
  
  constructor(
    private route: ActivatedRoute,
    private leman24S: LeMan24Service) {
      
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

    this.route.paramMap.subscribe((param: ParamMap)=>{

      this.id = parseInt(param.get('id') as string);
      if(this.id){
        this.leman24S.getData$().subscribe(()  =>  {
        this.car = this.leman24S.getCarById(this.id);
        this.carPics = this.leman24S.getCarById(this.car.id).carPhotoList;
        this.setFont();  
      })
     
      }    
    });
  }

  setFont(): void{
    if (document.getElementById("idModelName"))
    {
      var monObj= document.getElementById("idModelName");
      if (monObj != null) 
      {monObj.style.fontSize = 
         Math.min(200, 600 /(this.car.modelName.length * 1.3)).toString() + "px"; 
      }
    }
  }
}
