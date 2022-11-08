import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Car } from 'src/app/models/car.model';
import { CarPhoto } from 'src/app/models/carPhoto.model';
import { Pilot } from 'src/app/models/pilot.model';
import { Team } from 'src/app/models/team.model';
import { LeMan24Service } from 'src/app/shared/le-man24.service';

@Component({
  selector: 'app-form-car',
  templateUrl: './form-car.component.html',
  styleUrls: ['./form-car.component.scss']
})
export class FormCarComponent implements OnInit {
  id: number= 0;

  car !: Car;  //= new Car(0,[],'','',0,0,0,'',(new Team(0,'','',0,'',[],[],[])),(new Pilot(0,[],'','',(new Date),0,'','',null,null)));

  teamList!: Team[];
  textBtnSubmit: string = "Ajouter";
  url: string = '' ;

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
        this.url = this.car.carPhotoList[0].urlPhoto;
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
      this.car.carPhotoList.unshift(new CarPhoto (this.id,this.car,this.url));   
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
