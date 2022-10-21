import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  menu: MenuItem[] = [];
  constructor() {}

  ngOnInit(): void {
    this.menu=[
      {
        label: 'Gestion',
        items:[{
                label:'Add New Car',  "routerLink": '/addCar'
              },
              {
                label:'Add New Pilot'
              },
              {
                label:'Add New Team'
              }],      
      }
    ];console.log(this.menu);
} 


}

