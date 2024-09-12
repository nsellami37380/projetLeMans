import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isConnected: boolean = false;
  
  constructor(private vps: ViewportScroller,
    private authS: AuthService) {}

  ngOnInit(): void {
    this.authS.appUser$.subscribe(appuser => {
      this.isConnected = appuser.username != '';
    })
  }

  scrollToAnchor(anchor: string) {
    this.vps.scrollToAnchor(anchor);
  }

  ToastAndRedirectIsNotConnected() {
  this.authS.ToastAndRedirectIsNotConnected();
}
}
