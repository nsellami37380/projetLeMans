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
                label:'Car',
                items:[{label:'Add New Car'}]
              },
              {
                label:'Pilot',
                items:[{label:'Add New Pilot'}]
              },
              {
                label:'Team',
                items:[{label:'Add New Team'}]
              }],
              
      }
    ]
}
}

