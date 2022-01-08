import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../../core/service/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  form!: FormGroup;
  loginSubscription!: Subscription;

  constructor(
    private auth: AuthService,
    private router: Router, 
    private activateRoute: ActivatedRoute,
    private toastr: ToastrService 
  
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    })

    this.activateRoute.queryParams.subscribe((params: Params) => {
      if(params['registered']) {
        this.toastr.success('Now you can log in with your email and password')
      } else if (params['accessDenied']) {
        this.toastr.warning('Log in to the system first');
      } else if (params['sessionFailed']) {
        this.toastr.warning('Please log in again')
      }
    })
  }

  ngOnDestroy() {
    if(this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }

  onSubmit(): void {
    this.form.disable();
    this.loginSubscription = this.auth.login(this.form.value).subscribe(
      () => (this.router.navigate(['/home']), this.toastr.success('You are log in successfully!')), 
      error => {this.toastr.error(error.error.message), this.form.enable()}
    )
  }
}
