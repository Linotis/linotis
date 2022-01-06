import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './shared/component/error-page/error-page.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { AuthGuard } from './core/guard/auth.guard';
import { ContentLayoutComponent } from '../app/layout/content-layout/content-layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full'
  },
  {
    path: '', 
    component: ContentLayoutComponent, 
    canActivate: [AuthGuard], 
    children : [
      {
        path: '', loadChildren: () => import('../app/modules/home/home.module').then(m => m.HomeModule)
      }
    ]
  },
  {
    path: 'auth',
    component: AuthLayoutComponent, 
    loadChildren: () => import('../app/modules/auth/auth.module').then(m => m.AuthModule)
  },
  {path: '**', component: ErrorPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
