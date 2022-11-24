import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { LeMan24Service } from 'src/app/shared/le-man24.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [MessageService]
})
export class HomeComponent implements OnInit {

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {}

  }
