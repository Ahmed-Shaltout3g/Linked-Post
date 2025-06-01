import { Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { NotfoundComponent } from './Components/notfound/notfound.component';
import { SigninComponent } from './Components/signin/signin.component';
import { SignupComponent } from './Components/signup/signup.component';
import { ChangePasswordComponent } from './Components/change-password/change-password.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { CreatePostComponent } from './Components/create-post/create-post.component';
import { PostsComponent } from './Components/posts/posts.component';
import { userNotLoginGuard } from '../Cores/Guards/user-not-login.guard';
import { userLoginGuard } from '../Cores/Guards/user-login.guard';
import { UpdatePostComponent } from './Components/update-post/update-post.component';
import { UploadImageComponent } from './Components/upload-image/upload-image.component';

export const routes: Routes = [
    {path:'', redirectTo:'home' , pathMatch:'full'},
    {path:'home', component:HomeComponent, canActivate:[userNotLoginGuard] ,  title:'Home - Linked Posts'},
    {path:'register', component:SignupComponent,canActivate:[userNotLoginGuard] , title:'Sign Up - Linked Posts'},
    {path:'login', component:SigninComponent,canActivate:[userNotLoginGuard] , title:'Sign In - Linked Posts'},
    {path:'change-password', component:ChangePasswordComponent, canActivate:[userLoginGuard], title:'Change Password - Linked Posts'},
    {path:'profile', component:ProfileComponent,canActivate:[userLoginGuard], title:'Profile - Linked Posts'},
    {path:'posts', component:PostsComponent,canActivate:[userLoginGuard], title:'Posts - Linked Posts'},
    {path:'update-post/:id', component:UpdatePostComponent,canActivate:[userLoginGuard], title:'Update Post - Linked Posts'},
    {path:'add-post', component:CreatePostComponent,canActivate:[userLoginGuard], title:'Add Post - Linked Posts'},
    {path:'upload-image', component:UploadImageComponent,canActivate:[userLoginGuard], title:'Upload Photo - Linked Posts'},
    {path:'**', component:NotfoundComponent, title:'Page Not Found - Linked Posts'},
];
