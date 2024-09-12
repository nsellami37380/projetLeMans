import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { AppUser } from 'src/app/models/appUser.model';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.scss'],
})
export class FormLoginComponent implements OnInit {
  username: string = '';

  password: string = '';

  appUser: AppUser = new AppUser([], '', 0);

  userLoggedIn: boolean = false;

  constructor(
    private authS: AuthService,
    private messageService: MessageService,
    private route: Router
  ) {}

  ngOnInit(): void {}

  userLogin() {
    this.authS.getAuth(this.username, this.password).subscribe((jwt) => {
      this.assignTokenToConnectedUser(jwt);
      this.displayOnLoginToastAndRedirect();
    });
  }

  displayOnLoginToastAndRedirect() {
    setTimeout(() => {
      this.route.navigate(['/home']);
    }, 2000);
    this.messageService.add({
      severity: 'success',
      summary: 'Connecté',
      detail: 'Redirection en cours...',
    });
  }

  assignTokenToConnectedUser(jwt: any) {
    localStorage.clear();
    this.authS.assignAppuser(jwt.access_token);
    localStorage.setItem('tokenId', jwt.access_token);
  }

  getUser() {
    this.authS.getUserList().subscribe((data) => console.log(data));
  }
}
