import { Component, HostListener, OnInit } from '@angular/core';
import { ScrollUtilService } from './shared/scroll-util.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  percentageScrolled: number = 0;
  threshold: number = 0;

  constructor(public scrollS: ScrollUtilService) {}

  @HostListener('window:scroll', ['$event'])
  getScroll() {
    this.scrollS.getCurrentScroll();
  }

  ngOnInit(): void {
    this.scrollS.percentageScrolled$.subscribe(scroll => {
      this.percentageScrolled = scroll;
    });
    this.threshold = this.scrollS.threshold;
  }

}

