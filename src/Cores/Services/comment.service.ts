import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../Environment/Environment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private readonly _HttpClient: HttpClient = inject(HttpClient);
  // create comment
  createComment(model: object): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/comments`, model, {
      headers: {
        token: localStorage.getItem('userToken') || ''
      }
    })
  }
  // get comments for post
  getCommentsForPost(postId: string): Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}/posts/${postId}/comments`, {
      headers: {
        token: localStorage.getItem('userToken') || ''
      }
    })
  }
  // update comment
  updateComment(commentId: string, model: object): Observable<any> {
  return this._HttpClient.put(`${environment.baseUrl}/comments/${commentId}`, model, {
      headers: {
        token: localStorage.getItem('userToken') || ''
      }
    })
  }
  // delete comment
  deleteComment(commentId: string): Observable<any> {
    return this._HttpClient.delete(`${environment.baseUrl}/comments/${commentId}`, {
      headers: {
        token: localStorage.getItem('userToken') || ''
      }
    })
  }

}
