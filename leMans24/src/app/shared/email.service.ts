import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContactForm } from '../models/contactForm.model';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private url = "http://localhost:8080/sendMail";

  constructor(private http: HttpClient) { }
  public getJsonObject(obj: object): string {
    let myString = JSON.stringify(obj, null, '\t'); // tab
    return myString;
  }

  public sendEmail(contactForm: ContactForm): Observable<ContactForm> {
    return this.http.post<ContactForm>(this.url, contactForm);
  }
}
