import { UserService } from './../../../Cores/Services/user.service';
import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  // injection 
  private readonly _UserService: UserService = inject(UserService)
  isLoggin: boolean = false;
  userData: any;
  image: string = ''
  ngOnInit(): void {
    this._UserService.isLoggin.subscribe(loggin => {
      this.isLoggin = loggin;
    })
    this._UserService.userData.subscribe(user => {
      this._UserService.getUserData().subscribe({
        next: (res) => {
          this.image = res.user.photo;
        },
      })
    })


  }

}
