import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'FrontEndSocial';
  token: string;
  constructor(){

  }
  ngOnInit(){
    this.token = localStorage.getItem("coolbeans");
  }

}
