import { Component, OnInit } from '@angular/core';
import { LeMan24Service } from 'src/app/shared/le-man24.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.scss']
})
export class CarDetailsComponent implements OnInit {

  id: number = 0;
  car: any;

  constructor(private carService: LeMan24Service) { }

  ngOnInit(): void {
    
  }

}
