import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, convertToParamMap, ParamMap } from '@angular/router';
import { Car } from 'src/app/models/car.model';
import { Team } from 'src/app/models/team.model';
import { LeMan24Service } from 'src/app/shared/le-man24.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.scss']
})
export class CarDetailsComponent implements OnInit {

  carId: number = 0;
  car: any;
 
  

  constructor(private route: ActivatedRoute, private carService: LeMan24Service) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap)=>{
      if(params.get('id')){
        this.carId = parseInt(params.get('id') as string);
      } 
    });

    this.carService.carDetail.subscribe(carStream=>{
      this.car = carStream;
      console.log(carStream)
    });
  }

}
