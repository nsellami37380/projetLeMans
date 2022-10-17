import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Pilot } from 'src/app/models/pilot.model';
import { LeMan24Service } from 'src/app/shared/le-man24.service';

@Component({
  selector: 'app-container-list',
  templateUrl: './container-list.component.html',
  styleUrls: ['./container-list.component.scss']
})
export class ContainerListComponent implements OnInit {

  objectList: any = [];
  url: string = '';

  constructor(private route: ActivatedRoute,
    private leMan24S: LeMan24Service) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((param: ParamMap)=>{
      this.url = param.get('var') as string;
    })

    this.leMan24S.getPilots().subscribe(PilotsFromJsonFile => {
      this.objectList = PilotsFromJsonFile;
      console.log(this.objectList);
    });

  }

}
