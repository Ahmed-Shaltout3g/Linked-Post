import { Component, EventEmitter, inject, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserService } from '../../../Cores/Services/user.service';

@Component({
  selector: 'app-upload-image',
  standalone: true,
  imports: [],
  templateUrl: './upload-image.component.html',
  styleUrl: './upload-image.component.scss'
})
export class UploadImageComponent {

  // injection 
  private readonly _UserService: UserService = inject(UserService)
  private readonly _ToastrService: ToastrService = inject(ToastrService)
  private readonly _Router: Router = inject(Router)

  // properties
  @Output() closeModal = new EventEmitter<void>();
  selectedFile: File | null = null;
  loading: boolean = false;
  // functions
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    console.log(event)
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

  uploadImage(): void {
    this.loading = true;
    const formData = new FormData();
    if (!this.selectedFile) {
      this._ToastrService.error('Please select an image first.');
      return;
    }
    formData.append('photo', this.selectedFile);



    this._UserService.uploadProfilePhoto(formData).subscribe({
      next: (res) => {
        if (res.message = "success") {
          this.loading = false;
          this.closeModal.emit();
          this._ToastrService.success("Your photo was being changed")
        }
      },
      error: (err) => {
        this.loading = false;
        this._ToastrService.error(err?.error?.error)
      }
    })
  }
}