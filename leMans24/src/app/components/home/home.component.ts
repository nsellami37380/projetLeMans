import { Component, OnInit } from '@angular/core';
import { LeMan24Service } from 'src/app/shared/le-man24.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private leMans24S: LeMan24Service) {}

  ngOnInit(): void {}

  }
