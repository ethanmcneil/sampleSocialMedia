import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { FormGroup, FormBuilder, Form } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  postForm: FormGroup;
  userN: string;

  constructor(public fb: FormBuilder, private postService: PostService, private router: Router) { 
    this.postForm = this.fb.group(
      {
        message: ['']
      }
    )
  }

  ngOnInit(): void {
    this.userN = localStorage.getItem("user");
  }

  submitForm() {
    this.postService.addNewPost(this.postForm.get('message').value).subscribe( response => {
      this.router.navigate(['/feed']);
    });
  }
}
