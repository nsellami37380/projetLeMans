import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import jwt_decode from 'jwt-decode';
import { AppUser } from 'src/app/models/appUser.model';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.scss']
})
export class FormLoginComponent implements OnInit {

  username:string= "";

  password:string= "";

  appUser: AppUser = new AppUser([], '',0)



  constructor(private authS:AuthService) { }

  ngOnInit(): void {
  }

  userLogin(){
    this.authS.getAuth(this.username, this.password).
      subscribe((jwt)=>
      {
      this.authS.assignAppuser(jwt.access_token);
      localStorage.clear();
      localStorage.setItem("tokenId", jwt.access_token);
  })
  }


  getUser(){
    this.authS.getUserList().subscribe((data)=> console.log(data));
  }

}
