import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, ParamMap } from '@angular/router';
import { Car } from 'src/app/models/car.model';

import { LeMan24Service } from 'src/app/shared/le-man24.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.scss']
})
export class CarDetailsComponent implements OnInit {

  car: any;
  id: number= 0;
  carPics: String[] = [];
  
  constructor(
    private route: ActivatedRoute,
    private leman24S: LeMan24Service) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe((param: ParamMap)=>{

      this.id = parseInt(param.get('id') as string);
     if(this.id){
      this.car = this.leman24S.getCarById(this.id);
      this.setFont();  
     }    
    });

    // this.leman24S.getCars().subscribe(carList =>{
    //   this.carPics = carList
    //   console.log(carList)
    // });
    this.carPics = this.leman24S.getCarById(this.car.id).pictureList;
    console.log("carPics " + this.carPics);
    
  }

  setFont(): void{
    if (document.getElementById("idModelName"))
    {
      var monObj= document.getElementById("idModelName");
      if (monObj != null) 
      {monObj.style.fontSize = 
         Math.min(200, 600 /(this.car.modelName.length * 0.8)).toString() + "px"; 
      }
    }
  }
}
