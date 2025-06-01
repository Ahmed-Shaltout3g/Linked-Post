import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../Environment/Environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private readonly _HttpClient: HttpClient = inject(HttpClient);
  // create posts
  createPost(formData: FormData): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/posts`, formData, {
      headers: {
        token: localStorage.getItem('userToken') || ''
      }
    })
  }
  // get all posts
  getAllPosts(page:number=1): Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}/posts?page=${page}`, {
      headers: {
        token: localStorage.getItem('userToken') || ''
      }
    })
  }
  // get user posts 
  getUserPosts(limit: number = 5): Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}/users/664bcf3e33da217c4af21f00/posts?limit=${limit}`, {
      headers: {
        token: localStorage.getItem('userToken') || ''
      }
    })
  }

  // get post details
  getPost(postId: string): Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}/posts/${postId}`, {
      headers: {
        token: localStorage.getItem('userToken') || ''
      }
    })
  }
  // update post
  updatePost(postId: string, formData: FormData): Observable<any> {
    return this._HttpClient.put(`${environment.baseUrl}/posts/${postId}`, formData, {
      headers: {
        token: localStorage.getItem('userToken') || ''
      }
    })
  }
  // delete post
  DeletePost(postId: string): Observable<any> {
    return this._HttpClient.delete(`${environment.baseUrl}/posts/${postId}`, {
      headers: {
        token: localStorage.getItem('userToken') || ''
      }
    })
  }
}
