import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  form!: FormGroup;
  loginSubscription!: Subscription;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
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
      () => console.log("Login ok"), error => {console.warn(error), this.form.enable()}
    )
  }
}
