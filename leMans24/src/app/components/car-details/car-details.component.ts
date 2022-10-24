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

  car !: Car;
  id: number= 0;
  constructor(private route: ActivatedRoute,private leman24S: LeMan24Service) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe((param: ParamMap)=>{

      this.id = parseInt(param.get('id') as string);
     if(this.id){
      this.car = this.leman24S.getCarById(this.id);  
     }    
    })
  }



}
