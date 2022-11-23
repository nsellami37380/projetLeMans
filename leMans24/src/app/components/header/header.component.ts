import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MenuItem} from 'primeng/api';
import { ERole } from 'src/app/models/enum/ERole.enum';
import { AuthService } from 'src/app/shared/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  menu: MenuItem[] = [];
  visibleSidebar1: boolean = false;
  isAdmin: boolean = false;

  constructor(private router: Router,
             private authS: AuthService) {}

  ngOnInit(): void {

    this.isAdmin = this.authS.getAppUser().roleList.includes(ERole.ROLE_ADMIN)
    console.log(this.isAdmin);

    this.authS.appUser$.subscribe(appuser => {
      this.isAdmin = appuser.roleList.includes(ERole.ROLE_ADMIN)
    })

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