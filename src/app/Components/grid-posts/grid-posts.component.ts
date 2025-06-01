import { DatePipe } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { IPost } from '../../../Cores/Interfaces/ipost';
import { CommentsComponent } from '../../../Cores/Shared/UI/comments/comments.component';
import { LoadingPostsComponent } from "../loading-posts/loading-posts.component";
import { PostService } from '../../../Cores/Services/post.service';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-grid-posts',
  standalone: true,
  imports: [DatePipe, CommentsComponent, LoadingPostsComponent, RouterLink],
  templateUrl: './grid-posts.component.html',
  styleUrl: './grid-posts.component.scss'
})
export class GridPostsComponent  {
  // injection 
  private readonly _PostService: PostService = inject(PostService)
  private readonly _ToastrService: ToastrService = inject(ToastrService)
  // properties
  @Input({ required: true }) posts: IPost[] = [];
  @Input() isLoading: boolean = false;
  @Input() inProfile: boolean = false;
  ngOnInit():void 
  {
    console.log(this.posts)
  }
  loading:boolean = false;
  removePost(postId:string): void {
    this.loading = true;
    this._PostService.DeletePost(postId).subscribe({
      next:(res)=>{
        if(res.message == "success"){
          this.loading = false;
          this._ToastrService.success('post deleted successfully')
          this.posts = this.posts.filter(post => post.id != postId)
        }
      },
      error:(err)=>{
        this.loading = false;
        this._ToastrService.error(err.error.error)

      }
    })
  }
}
