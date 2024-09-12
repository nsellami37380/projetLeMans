import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Car } from 'src/app/models/car.model';
import { CarPhoto } from 'src/app/models/carPhoto.model';
import { Team } from 'src/app/models/team.model';
import { LeMan24Service } from 'src/app/shared/le-man24.service';

@Component({
  selector: 'app-form-car',
  templateUrl: './form-car.component.html',
  styleUrls: ['./form-car.component.scss']
})
export class FormCarComponent implements OnInit {
  id: number= 0;
  car : Car = new Car(0,[],'','',0,0,0,'',{} as Team,undefined);
  teamList : Team[] = [];
  teamId:number = 0;
  textBtnSubmit: string = "Ajouter";
  urlList: string[] = [];
  file !: File;
  title = "Ajouter une voiture";
  constructor(  
    private leman24S: LeMan24Service,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
  
    this.route.paramMap.subscribe((param: ParamMap)=>{
      this.teamList = this.leman24S.getTeamList();
      if (param.get('id') != null)
      {

        this.id =  parseInt( param.get('id') as string);
        this.textBtnSubmit = "Modifier"
        this.car = this.leman24S.getCarById(this.id);
        console.log(this.leman24S.getJsonObject(this.car));
        
        if (this.car.team?.id)
          this.teamId = this.car.team?.id as number;
         else{
          let idTeam: any = this.car.team;
          this.teamId = idTeam as number
         }
         
        this.title = "Modifier la voiture " + this.car.modelName;
        this.car.carPhotoList.forEach(CarPhoto => {
          this.urlList.push(CarPhoto.urlPhoto);          
        });;
         }      
    })
  }

 selectfile(event: any): void{
  if (event.target.files){
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]) 
    this.file = event.target.files[0];  
    reader.onload = (event: any) => {
      this.car.carPhotoList.push(new CarPhoto ("/assets/" + this.file.name));
      this.urlList.push(event.target.result)   
       this.leman24S.uploadFile(this.file)
    }
  }
 }

 selectMainfile(event: any): void{
  if (event.target.files){
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]) 
    this.file = event.target.files[0];  
    reader.onload = (event: any) => {
      this.urlList.unshift(event.target.result);
       this.car.carPhotoList.unshift(new CarPhoto ("/assets/" + this.file.name));   
       this.leman24S.uploadFile(this.file)
    }
  }
 }
 deleteImg(img: string){
  this.urlList = this.urlList.filter(url =>url != img);
  this.car.carPhotoList = this.car.carPhotoList.filter(carPhoto =>carPhoto.urlPhoto != img);

 }
  addCar(): void{

    if (this.teamId != 0)
    {
      this.car.team = this.leman24S.getTeamById(this.teamId);
    }
    if (this.id != 0)
     this.leman24S.updateCar(this.car);
    else
      this.leman24S.addCar(this.car);
 }

 getPlaceholder(event: Event) {
  (event.target as HTMLImageElement).src="/assets/car-img-main.png"
 }
}
