import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactForm } from '../models/contactForm.model';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  contactForm: ContactForm = new ContactForm('','','','');

  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  emailSend(){
    this.route.navigate(["/home"]);
    return alert('Email envoyé')
  }
}
