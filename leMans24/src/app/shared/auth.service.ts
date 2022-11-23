import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppUser } from '../models/appUser.model';
import jwt_decode from 'jwt-decode';
import { ERole } from '../models/enum/ERole.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly BASE_URL = "http://localhost:8080";
  
  private appUser: AppUser = new AppUser([], '',0);
  
  appUser$: BehaviorSubject<AppUser> = new BehaviorSubject<AppUser>(new AppUser([], '',0));

  constructor(private http: HttpClient) {
    if(localStorage.getItem("appUser")){
      const user = JSON.parse(localStorage.getItem("appUser") as string);
      this.appUser$.next(user);
    }
   }


  getAuth(username: string, password:string): Observable<any>{
    const userToLog: HttpParams = new HttpParams()
    .set("username", username)
    .set("password", password)
    
    return this.http.post<HttpParams>(this.BASE_URL + "/login", userToLog);
  }
  
  getUserList(): Observable<any>{
    return this.http.get<any>(this.BASE_URL + "/api/users/all")
  }

  assignAppuser(token: string){
    let appUser = new AppUser([], '',0)
    const jwtDecoded: any = jwt_decode(token);
    appUser.roleList = jwtDecoded.roles;
    appUser.username = jwtDecoded.sub;
    appUser.expiration = jwtDecoded.exp;
    this.appUser$.next(appUser);
    localStorage.setItem("appUser", JSON.stringify(appUser))
  }

  getDecodedAccessToken(token: string): any {
    try {
      console.log(jwt_decode(token));
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
  }

  getAppUser(): AppUser{
    return this.appUser;
  }
}


