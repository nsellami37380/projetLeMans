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
  isUser: boolean = false;
  isManager: boolean = false;
  username:string = "";
  isConnected: boolean = false;
  role:string ="";

  constructor(private router: Router,
             private authS: AuthService) {}

  ngOnInit(): void {

    this.isAdmin = this.authS.getAppUser().roleList.includes(ERole.ROLE_ADMIN)
    console.log(this.isAdmin);
  

    this.authS.appUser$.subscribe(appuser => {
      this.isAdmin = appuser.roleList.includes(ERole.ROLE_ADMIN)
      this.isUser = appuser.roleList.includes(ERole.ROLE_USER)
      this.isManager = appuser.roleList.includes(ERole.ROLE_MANAGER)
      this.isConnected = appuser.username !='';
      this.username = appuser.username;
      if(this.isConnected && appuser.roleList.includes(ERole.ROLE_ADMIN)){
        this.role = 'Administrateur';
      }else if(this.isConnected && appuser.roleList.includes(ERole.ROLE_MANAGER)){
        this.role = "Manager";
      }else if(this.isConnected && appuser.roleList.includes(ERole.ROLE_USER)){
        this.role = "";
      }
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

  logOut(){
    this.authS.logOut();
  }
}
