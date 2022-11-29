import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ContactForm } from '../models/contactForm.model';
import { EmailService } from '../shared/email.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  contactForm: ContactForm = new ContactForm('', '', '', '');

  constructor(private route: Router,
    private emailS: EmailService, private messageService: MessageService) { }

  ngOnInit(): void {
  }

  emailSend() {
    
    this.emailS.sendEmail(this.contactForm).subscribe((email) => {      
      this.messageService.add({
        severity: 'success',
        summary: email.status,
        detail: 'Redirection en cours...',
      });
      this.route.navigate(['/home']);
    });
  }
}
