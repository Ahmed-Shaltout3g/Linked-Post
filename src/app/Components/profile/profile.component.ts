import { Component, inject, OnInit } from '@angular/core';
import { PostService } from '../../../Cores/Services/post.service';
import { IPost } from '../../../Cores/Interfaces/ipost';
import { GridPostsComponent } from "../grid-posts/grid-posts.component";
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../Cores/Services/user.service';
import { Iprofile } from '../../../Cores/Interfaces/iprofile';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { CreatePostComponent } from "../create-post/create-post.component";
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [GridPostsComponent, DatePipe, TitleCasePipe, CreatePostComponent, RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  // injection 
  private readonly _postService: PostService = inject(PostService);
  private readonly _ToastrService: ToastrService = inject(ToastrService);
  private readonly _UserService: UserService = inject(UserService);
  private readonly _Router: Router = inject(Router);

  // properties 
  myPosts: IPost[] = [];
  isLoading: boolean = false;
  profile!: Iprofile;
  profileLoading: boolean = false;
  //functions
  getMyPosts(): void {
    this.isLoading = true;
    this._postService.getUserPosts().subscribe({
      next: (res) => {
        this.myPosts = res.posts;
      },
      error: (err) => {
        this._ToastrService.error(err?.error?.error);
      },
      complete: () => {
        setTimeout(() => {
          this.isLoading = false;
        }, 1500);
      }
    })
  }
  getUserInfo(): void {
    this.profileLoading = true;
    this._UserService.getUserData().subscribe({
      next: (res) => {
        this.profile = res.user;
      },
      error: (err) => {
        this._ToastrService.error(err?.error?.error);
      },
      complete: () => {
        setTimeout(() => {
          this.profileLoading = false;
        }, 1000);
      }
    })
  }
  ngOnInit(): void {
    this.getUserInfo();
    this.getMyPosts();
  }

  signOut():void 
  {
    localStorage.removeItem('userToken')
    this._UserService.isLoggin.next(false);
    this._UserService.saveUserData();
    this._Router.navigate(['/login'])
  }

}
