import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { RouterModule } from '@angular/router';
import { UserLayoutComponent } from './shared/user-layout/user-layout.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';

@NgModule({
  declarations: [
    UserLayoutComponent,
    ProfilePageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '', component: UserLayoutComponent, children: [
          {path: '', redirectTo: '/user/profile', pathMatch: 'full'},
          {path: 'profile', component: ProfilePageComponent}
        ]
      }
    ])
  ]
})
export class UserModule { }
