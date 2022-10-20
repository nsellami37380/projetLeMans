import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, convertToParamMap, ParamMap } from '@angular/router';
import { Car } from 'src/app/models/car.model';
import { Team } from 'src/app/models/team.model';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.scss']
})
export class CarDetailsComponent implements OnInit {

  carId: number = 0;
  
  

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap)=>{
      if(params.get('id')){
        this.carId = parseInt(params.get('id') as string);
      } 
    });
  }

}
