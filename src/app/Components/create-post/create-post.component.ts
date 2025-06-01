import { PostService } from './../../../Cores/Services/post.service';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.scss'
})
export class CreatePostComponent {

  // injection 
  private readonly _PostService: PostService = inject(PostService)
  private readonly _ToastrService: ToastrService = inject(ToastrService)
  private readonly _Router: Router = inject(Router)

  // properties
  @Output() closeModal = new EventEmitter<void>();
  selectedFile: File | null = null;
  content: string = '';
  loading: boolean = false;
  // functions
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    const container = event.target as HTMLElement;
    container.classList.add('drag-over');
  }

  onDragLeave(event: DragEvent): void {
    const container = event.target as HTMLElement;
    container.classList.remove('drag-over');
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    const container = event.target as HTMLElement;
    container.classList.remove('drag-over');

    if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
      this.selectedFile = event.dataTransfer.files[0];
    }
  }

  addPost(): void {
    this.loading = true;
    const formData = new FormData();
    if (!this.selectedFile) {
      alert('Please select an image first.');
      return;
    }
    formData.append('image', this.selectedFile);

    if (this.content !== "") {
      formData.append('body', this.content);
    }
    this._PostService.createPost(formData).subscribe({
      next: (res) => {
        console.log(res)
        if (res.message = "success") {
          this.loading = false;
          this.closeModal.emit();
          this._Router.navigate(['/profile'])
          this._ToastrService.success("Your post added successfully")
        }
      },
      error: (err) => {
        this.loading = false;
        this._ToastrService.error(err?.error?.error)
      }
    })
  }
}