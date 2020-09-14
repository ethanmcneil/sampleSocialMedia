import { Component, OnInit } from '@angular/core';
import { Post } from '../models/post';
import { PostService } from '../services/post.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {
  public postData: Post[];
  token: string;
  base_url: string = "http://localhost:8080/"
  error: string;
  userN: string;
  postForm: FormGroup;

  constructor(private postService: PostService, public fb: FormBuilder) {
    this.userN = localStorage.getItem("user"); 
    this.postForm = this.fb.group(
      {
        message: ['']
      }
    )

  }

  ngOnInit(): void {
    this.postService.getAllPost().subscribe(listOfPosts => {
      this.postData = listOfPosts.slice().reverse();
    })
  }

  deletePost(id) {
   this.postService.deletePost(id).subscribe( response => {
      alert("You Deleted That Post!")
      location.reload();
   })

  }
  updatePosts() {
    document.getElementById("newText").classList.remove("noShow");
  }
  submitForm(id) {
    this.postService.updatePost(id, this.postForm.get("message").value).subscribe( response => {
      alert("It's updated!")
      location.reload();
    })
  }
}
