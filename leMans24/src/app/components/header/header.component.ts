import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MenuItem} from 'primeng/api';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  menu: MenuItem[] = [];
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.menu=[
      {
        label: 'Add',
        items:[{
                label:'Add New Car', "routerLink": '/addCar'
                
              },
              {
                label:'Add New Pilot', "routerLink": '/addPilot'
              },
              {
                label:'Add New Team', "routerLink": '/addTeam'
                
              }],
              
      }
    ]
}
//   addCar(): void {
//     this.router.navigate(['/addCar']);
 
// }
}



