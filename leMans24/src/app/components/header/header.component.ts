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
                label:'Ajouter une Écurie', "routerLink": '/addTeam'                
              },
              {
                label:'Ajouter une Voiture', "routerLink": '/addCar'
              },
              {
                label:'Ajouter un Pilote', "routerLink": '/addPilot'
              }],
       }
    ]
  }
}