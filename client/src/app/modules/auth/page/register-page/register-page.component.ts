import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../../core/service/auth.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {

  form!: FormGroup;
  registerSubscribtion!: Subscription;

  constructor(
    private auth: AuthService, 
    private router: Router, 
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      age: new FormControl(null, [Validators.required, Validators.min(1)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    })
  }

  ngOnDestroy() {
    if(this.registerSubscribtion) {
      this.registerSubscribtion.unsubscribe();
    }
  }

  onSubmit() {
    this.form.disable();
    this.registerSubscribtion = this.auth.register(this.form.value).subscribe(
      () => {
        this.router.navigate(['/auth/login'], {
          queryParams: {
            registered: true
          }
        })
      }, error => {
        this.toastr.error(error.error.message),
        this.form.enable()
      })
  }

}
