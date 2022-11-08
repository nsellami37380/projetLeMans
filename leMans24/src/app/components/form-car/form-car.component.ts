import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Car } from 'src/app/models/car.model';
import { Team } from 'src/app/models/team.model';
import { LeMan24Service } from 'src/app/shared/le-man24.service';

@Component({
  selector: 'app-form-car',
  templateUrl: './form-car.component.html',
  styleUrls: ['./form-car.component.scss']
})
export class FormCarComponent implements OnInit {
  id: number= 0;
  car!: Car ;
  teamList!: Team[];
  textBtnSubmit: string = "Ajouter";
  url="";

  constructor(
    private leman24S: LeMan24Service,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.leman24S.getTeams().subscribe(teams => {this.teamList = teams});
    this.route.paramMap.subscribe((param: ParamMap)=>{

      if (param.get('id') != null)
      {
        this.id =  parseInt( param.get('id') as string);
        this.textBtnSubmit = "Modifier"
        this.car = this.leman24S.getCarById(this.id);
        //this.url = this.car.carPhotoList[0];
         }      
    })
  }

 selectfile(event: any): void{
  if (event.target.files){
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0])   
    reader.onload = (event: any) => {
      this.url = event.target.result;
      //this.car.pictureList[0] = this.url;  
      //this.car.carPhotoList.unshift(this.url);   
    }
  }
 }
 
  addCar(): void{
    if (this.id != 0)
     this.leman24S.updateCar(this.car);
    else
      this.leman24S.addCar(this.car);
 }
}
