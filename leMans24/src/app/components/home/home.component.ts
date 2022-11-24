import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import { AuthService } from 'src/app/shared/auth.service';
import { LeMan24Service } from 'src/app/shared/le-man24.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [MessageService],
})
export class HomeComponent implements OnInit {
  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    (async () => {
      await this.setDelay(5000);

      this.connectPlease();
    })();
  }

  setDelay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  connectPlease() {
    this.messageService.clear();
    this.messageService.add({
      key:"c",
      sticky: true,
      severity: 'warn',
      summary: 'Are you sure?',
      detail: 'Confirm to proceed',
    });
  }
}
