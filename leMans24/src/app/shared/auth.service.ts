import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly BASE_URL = "http://localhost:8080";

  username: string = "";
  password: string = "";

  constructor(private http: HttpClient) { }

  getAuth(): Observable<any> {
    // Je construis l'objet username + password que j'envoie ensuite à mon server
    const userToLog: HttpParams = new HttpParams()
    // Utilisateur 1 
    .set("username", this.username) // Droits USER + MANAGER + ADMIN
    .set("password", this.password) //

    // Utilisateur 2 (pour tester d'autres routes)
    // .set("username", "calamity-jane") // Droits : USER
    // .set("password", "008")
    // J'envoie l'objet username + password vers mon server
    return this.http.post<HttpParams>(this.BASE_URL + "/login", userToLog);
  }

  getUsersList(): Observable<any[]> {
    return this.http.get<any[]>(this.BASE_URL + "/api/users/all");
  }

}
