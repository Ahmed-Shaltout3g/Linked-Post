import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { PostService } from '../../../Cores/Services/post.service';
import { IPost } from '../../../Cores/Interfaces/ipost';
import { PaginationPosts } from '../../../Cores/Interfaces/pagination-posts';
import { ToastrService } from 'ngx-toastr';
import { GridPostsComponent } from "../grid-posts/grid-posts.component";
import { RouterLink } from '@angular/router';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [GridPostsComponent, RouterLink , InfiniteScrollDirective],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss'
})
export class PostsComponent implements OnInit {
  // injection 
  private readonly _PostService: PostService = inject(PostService);
  private readonly _ToastrService: ToastrService = inject(ToastrService);
  // properties
  posts: IPost[] = [];
  paggination!: PaginationPosts;
  isLoading: boolean = false;




  getAllPosts(page: number = 1): void {
    this._PostService.getAllPosts(page).subscribe({
      next: (res) => {
        this.posts = [...this.posts, ...res.posts];
        this.paggination = res.paginationInfo;
      },
      error: (err) => {
        this._ToastrService.error(err?.error?.error)

      }
    })
  }
  ngOnInit(): void {
    this.isLoading = true;
    this.getAllPosts(1);
    setTimeout(() => {
      this.isLoading = false
    }, 3000);
  }
  onScroll() {
    if(this.paggination.currentPage < this.paggination.numberOfPages)
      this.getAllPosts(this.paggination.currentPage + 1)
  }


}