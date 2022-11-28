import { Component } from '@angular/core';
import { AuthService } from './shared/auth.service';
import { LeMan24Service } from './shared/le-man24.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'leMans24';
  tokenExpired: boolean = false;

  constructor(private authS: AuthService){
  }
  
   ngOnInit(): void {
  this.authS.tokenExpired$.subscribe(boolean=>{
    this.tokenExpired = boolean;
  })
   }
  }