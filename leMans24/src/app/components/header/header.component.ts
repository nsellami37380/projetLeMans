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
  visibleSidebar1: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.menu=[
      {
        label: 'Ajouter',
        items:[{
                label:'Une écurie', "routerLink": '/addTeam'                
              },
              {
                label:'Une voiture', "routerLink": '/addCar'
              },
              {
                label:'Un pilote', "routerLink": '/addPilot'
              }],
       }
    ]
  }
}