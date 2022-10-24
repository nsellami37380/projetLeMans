import { HttpClient } from '@angular/common/http';
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
  private url = "http://localhost:3000";
  status: string = "";
  constructor(private route: ActivatedRoute,private leman24S: LeMan24Service, private http: HttpClient) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe((param: ParamMap)=>{

      // if (param.get('id') != null)
      this.id =  parseInt( param.get('id') as string);
     
      this.car = this.leman24S.getCarById(this.id);

      console.log(this.car);
     
    })
  }
   deleteCar(){
    this.http.delete<Car>(this.url + '/car-detail/' + this.car.id)
        .subscribe(() => this.status = 'Delete successful');
   }


}
