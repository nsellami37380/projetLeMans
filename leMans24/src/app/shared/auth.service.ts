import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppUser } from '../models/appUser.model';
import jwt_decode from 'jwt-decode';
import { ERole } from '../models/enum/ERole.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly BASE_URL = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  private appUser: AppUser = new AppUser([], '',0);


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
    const jwtDecoded: any = jwt_decode(token);
    this.appUser.roleList = [ERole.ROLE_ADMIN];
    this.appUser.username = jwtDecoded.sub;
    this.appUser.expiration = jwtDecoded.exp;
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
  }

  getAppUser(): AppUser{
    return this.appUser;
  }
}

