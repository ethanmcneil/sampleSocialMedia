import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profile: User;
  form: FormGroup;

  constructor(public fb: FormBuilder, private userService: UserService) {
    this.form = this.fb.group(
      {
        webname: ['']
      }
    )
   }

  ngOnInit(): void {
    this.userService.getUserInfo().subscribe( profile => {
      this.profile = profile;
    })
  }

  submitForm() {
    let newWebName = this.form.get('webname').value;
    document.getElementById("webName").innerHTML = "Webname: " + newWebName;
    this.userService.updateUser(this.profile.id, newWebName);
  }
  deleteProfile() {
    this.userService.removeUser(this.profile.id);
  }
  updateProfile(){
    document.getElementById("profileUpdate").classList.remove("nosee");
  }

}
