import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.scss']
})
export class FormLoginComponent implements OnInit {

  username: string = "";
  password: string = "";

  constructor(private authservice: AuthService) { }

  ngOnInit(): void {
    
  }

}
