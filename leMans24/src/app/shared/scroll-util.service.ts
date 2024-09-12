import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScrollUtilService {

  percentageScrolled$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  threshold: number = 25;

  constructor() { }

  getCurrentScroll() {
    const winheight= window.innerHeight || (document.documentElement || document.body).clientHeight
    const docheight = this.getDocHeight()
    const scrollTop = window.pageYOffset;
    const trackLength = docheight - winheight
    const pctScrolled = Math.floor(scrollTop/trackLength * 100)
    this.percentageScrolled$.next(pctScrolled);    
  }

  getDocHeight() {
    var D = document;
    return Math.max(
        D.body.scrollHeight, D.documentElement.scrollHeight,
        D.body.offsetHeight, D.documentElement.offsetHeight,
        D.body.clientHeight, D.documentElement.clientHeight
    )
  }

}
