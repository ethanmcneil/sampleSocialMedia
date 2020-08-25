import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;

  constructor(public fb: FormBuilder, private userService: UserService) { 
    this.form = this.fb.group(
      {
        username: [''],
        password: [''],
        webname: ['']
      }
    )

  }

  ngOnInit(): void {
  }

  submitForm() {
    this.userService.addNewUser(this.form.get('username').value, this.form.get('password').value, this.form.get('webname').value);
  }

}
