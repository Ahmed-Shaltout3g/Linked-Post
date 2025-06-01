import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../../Cores/Services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  // properties 
  loading: boolean = false;
  // injection 
  private readonly _UserService: UserService = inject(UserService);
  private readonly _Router: Router = inject(Router);
  private readonly _ToastrService: ToastrService = inject(ToastrService);
  // register form
  registerForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]),
    rePassword: new FormControl(null),
    dateOfBirth: new FormControl(null, Validators.required),
    gender: new FormControl(null, Validators.required)
  }, this.confirmPassword)

  confirmPassword(g: AbstractControl) {
    if (g.get('password')?.value === g.get('rePassword')?.value)
      return null;
    else
      return { mismatch: true }
  }

  register(): void {
    this.loading = true;
    if (this.registerForm.valid) {
      this._UserService.signUp(this.registerForm.value).subscribe({
        next: (res) => {
          if (res.message === 'success') {
            this._Router.navigate(['/login'])
            this._ToastrService.success('You are now registered, log in')
          }
        },
        error: (err) => {
          this._ToastrService.error(err.error.error)
        },
        complete: () => {
          this.loading = false;
        }
      })
    } else {
      this.loading = false;
      this.registerForm.markAllAsTouched();
    }
  }


}
