import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/models/car.model';
import { LeMan24Service } from 'src/app/shared/le-man24.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  carToDisplay: Car[] = [];
  
  responsiveOptions: any[] = [];

  constructor(private carSlideService: LeMan24Service) { 
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
    this.carSlideService.getCars().subscribe(carList => {
      
      this.carToDisplay = carList
      console.log(carList);
    });
  }

  }
