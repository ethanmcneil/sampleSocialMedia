import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  public href: string = "";

  constructor(public fb: FormBuilder, private userService: UserService, private router: Router) { 
  this.form = this.fb.group(
    {
      username: [''],
      password: ['']
    }
  )
  }

  ngOnInit(): void {
    this.href = this.router.url;
    if (this.href.includes("/logout")) {
      localStorage.removeItem("coolbeans");
      localStorage.removeItem("user");
      this.router.navigate(['/']).then(() => {
        window.location.reload();
      });
    }
  }

  submitForm() {
    this.userService.onLogin(this.form.get("username").value, this.form.get("password").value);
  }
  
}
