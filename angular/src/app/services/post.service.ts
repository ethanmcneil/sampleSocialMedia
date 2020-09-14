import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Post } from '../models/post';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  title: string = 'angular';
  token: string;
  author: string;
  error: string;
  userN: string;
  base_url: string = "http://localhost:8080/";
  postData: Post[];


  constructor(private http: HttpClient, private router: Router) { 
  
  }
  getAllPost(): Observable<Post[]> {
    this.token = localStorage.getItem('coolbeans');
    this.author = localStorage.getItem('user');
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.token
     });
   let options = { headers: headers };
   return this.http.get<Post[]>(this.base_url + "post", options )
   // .subscribe(res => { this.postData = res;  }, 
    // error => this.error = "Unable to retrieve data.");
    //return this.postData;
  }

  addNewPost(message: string): Observable<String>  {
  this.token = localStorage.getItem('coolbeans');
  this.author = localStorage.getItem('user');  
  let headers = new HttpHeaders({
    'Content-Type': 'text/html',
    'Authorization': this.token,
    'author': this.author,
    'message': message
   });
  let options = { headers: headers };
  return this.http.post<String>(this.base_url + 'post/add', null, options);

}
deletePost(id): Observable<Post>{
let postId = id.toString();
this.token = localStorage.getItem('coolbeans');
this.author = localStorage.getItem('user');
let headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'Authorization': this.token,
  'author': this.author,
  'id': postId
 });
let options = { headers: headers };
return this.http.delete<Post>(this.base_url + 'post/delete', options);
}

updatePost(id: any, message: any): Observable<Post> {
this.token = localStorage.getItem('coolbeans');
this.author = localStorage.getItem('user');
console.log(id);
let headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'Authorization': this.token,
  'author': this.author,
  'message': message,
 });
let options = { headers: headers };
return this.http.put<Post>(this.base_url + 'post/' + id, null, options);
}
}