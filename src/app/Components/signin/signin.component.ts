import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../../Cores/Services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent {
  // injection
  private readonly _UserService: UserService = inject(UserService);
  private readonly _ToastrService: ToastrService = inject(ToastrService);
  private readonly _Router: Router = inject(Router);
  loading: boolean = false;
  // login form
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)])
  })
  login(): void {
    this.loading = true;
    if (this.loginForm.valid) {
      this._UserService.signIn(this.loginForm.value).subscribe({
        next: (res) => {
          this.loading = false;
          if (res?.message === "success") {
            this._Router.navigate(['/posts'])
            localStorage.setItem('userToken', res.token)
            this._UserService.saveUserData();
            this._ToastrService.success('Welecome back')
          }
        },
        error: (err) => {
          this._ToastrService.error(err.error.error)
        }
      })
    } else {
      this.loading = false
      this.loginForm.markAllAsTouched();
    }
  }

}
