import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  title: string = 'angular';
  token: string;
  error: string;
  userN: string;
  base_url: string = "http://localhost:8080/";
  data: any;

  constructor(private http: HttpClient, private router: Router) {
   }


 onLogin(username: string, password: string) {
    this.userN = username;
    this.http.post<any>(this.base_url + 'login', { username: username, password: password }, { observe: 'response' })
    .subscribe(
      res => {
        localStorage.setItem('coolbeans', res.headers.get("Authorization"));
        localStorage.setItem('user', this.userN);
        this.router.navigate(['/profile']).then(() => {
          window.location.reload();
        });
      },
      error => this.error = "Unable to login with username and password."
    );

  }

getUserInfo(): Observable<User>{
    this.userN = localStorage.getItem('user');
    this.token = localStorage.getItem('coolbeans');
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.token,
      'username': this.userN
     });
    let options = { headers: headers };
    return this.http.get<User>(this.base_url + "user", options);
   // ).subscribe(res => this.data = res, error => this.error = "Unable to retrieve data.");
   // return this.data;
  }


addNewUser(username: string, password: string, webname: string) {
  this.http.post<any>(this.base_url + 'user/register', { username: username, password: password, webName: webname }, { observe: 'response' })
    .subscribe(
      res => {
        this.token = res.headers.get("Authorization");
        alert("You are now registered! You can now login to the application!");
        this.router.navigate(['/login']).then(() => {
          window.location.reload();
        });
      },
      error => this.error = "Unable to register."
    );


}
updateUser(id: number, webname: string) {
  this.token = localStorage.getItem('coolbeans');
  let headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': this.token,
    'webName': webname
   });
  let options = { headers: headers };
  this.http.put<User>(this.base_url + 'user/' + id, {}, options)
    .subscribe(
      res => {
        alert("Success!");
        this.router.navigate(['/profile']).then(() => {
          window.location.reload();
        });
      },
      error => this.error = "Unable to login with username and password."
    );
}
removeUser(id: number) {
  this.token = localStorage.getItem('coolbeans');
  let headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': this.token,
   });
  let options = { headers: headers };
  this.http.delete<User>(this.base_url + 'user/' + id, options)
    .subscribe(
      res => {
        alert("Success!");
        localStorage.removeItem('coolbeans');
        localStorage.removeItem('user');
        this.router.navigate(['/']).then(() => {
          window.location.reload();
        });
      },
      error => this.error = "Unable to login with username and password."
    );
}
}
