import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { PostComponent } from './post/post.component';
import { FeedComponent } from './feed/feed.component';


const routes: Routes = [
  {
    path: "",
    component:  HomeComponent
    
  },
  {
    path: "register",
    component:  RegisterComponent

  },
  {
    path: "login",
    component:  LoginComponent

  },
  {
    path: "logout",
    component:  LoginComponent

  },
  {
    path: "profile",
    component: ProfileComponent

  },
  {
    path: "post",
    component: PostComponent

  },
  {
    path: "feed",
    component: FeedComponent

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
