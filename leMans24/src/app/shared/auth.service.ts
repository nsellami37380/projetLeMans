import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppUser } from '../models/appUser.model';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly BASE_URL = "http://localhost:8080";

  private appUser: AppUser = new AppUser([], '', 0);

  appUser$: BehaviorSubject<AppUser> = new BehaviorSubject<AppUser>(new AppUser([], '', 0));
  tokenExpired$ : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  isLoggedIn: boolean = false;
  isConnected: boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private messageService: MessageService
  ) {
    if (localStorage.getItem("appUser")) {
      const user = JSON.parse(localStorage.getItem("appUser") as string);
      this.appUser$.next(user);
    };
    setInterval(()=> this.verifToken(), 1000);
    this.appUser$.subscribe(appuser => {
      this.isConnected = appuser.username != '';
    })
  }


  getAuth(username: string, password: string): Observable<any> {
    const userToLog: HttpParams = new HttpParams()
      .set("username", username)
      .set("password", password)

    return this.http.post<HttpParams>(this.BASE_URL + "/login", userToLog);
  }

  getUserList(): Observable<any> {
    return this.http.get<any>(this.BASE_URL + "/api/users/all")
  }

  assignAppuser(token: string) {
    let appUser = new AppUser([], '', 0)
    const jwtDecoded: any = jwt_decode(token);
    appUser.roleList = jwtDecoded.roles;
    appUser.username = jwtDecoded.sub;
    appUser.expiration = jwtDecoded.exp;
    this.appUser$.next(appUser);
    localStorage.setItem("appUser", JSON.stringify(appUser))
  }

  logOut() {
    localStorage.clear();
    let appUser = new AppUser([], '', 0);
    this.appUser$.next(appUser);
    this.tokenExpired$.next(true);
    this.displayOnLogoutToastAndRedirect();
  }

  displayOnLogoutToastAndRedirect() {
    this.messageService.clear();
    this.messageService.add({
      severity: 'error',
      summary: 'Déconnexion',
      detail: 'Redirection en cours...',
    });
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 2000);
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }

  getAppUser(): AppUser {
    return this.appUser;
  }

  private verifToken(): void{
  
    const tokenkId = localStorage.getItem("tokenId")
    if (tokenkId)
    {
    const tokenDecode = this.getDecodedAccessToken(tokenkId);
    let diff = Math.round(Date.now()/1000) - tokenDecode.exp;
    if (diff > 0){
       this.logOut();
    }
  }
  }

  ToastAndRedirectIsNotConnected() {
    if(!this.isConnected){
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 2000);
      this.messageService.add({
        severity: 'error',
        summary: '',
        detail: 'Veuillez vous connecter pour accéder a cette rubrique',
      });
    }else {
      if(this.router.url == "category/teams"){
        this.router.navigate(['/category', 'teams' ]);
      }
      if(this.router.url == "category/pilots"){
        this.router.navigate(['/category', 'pilots' ]);
      }
      if(this.router.url == "category/cars"){
        this.router.navigate(['/category', 'cars' ]);
      }
    } 
    }
}


