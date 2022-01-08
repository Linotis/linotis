import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { ActiveToast, ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { AuthService } from '../../../../core/service/auth.service';

import { LoginPageComponent } from './login-page.component';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;
  
  let testToken = '123123';
  let testUser = {
    email: 'demo2@demo.com',
    password: '123123'
  }

  let toast: ActiveToast<any>;

  let fakeAuthService: AuthService;
  let fakeRouter: Router;
  let fakeActivateRoute: ActivatedRoute;
  let fakeToast: ToastrService;
  let navigateStatus: Promise<boolean>

  beforeEach(async () => {
    
    fakeAuthService = jasmine.createSpyObj<AuthService>('AuthService',{
      login: of({token: testToken})
    });

    fakeActivateRoute = jasmine.createSpyObj<ActivatedRoute>('ActivatedRoute', {}, {
      queryParams: of({params: {'registered': false}}),
    });

    fakeRouter = jasmine.createSpyObj<Router>('Router', {
      navigate: navigateStatus
    });

    fakeToast = jasmine.createSpyObj<ToastrService>('ToastrService', {
      success: toast
      
    });

    await TestBed.configureTestingModule({
      declarations: [ LoginPageComponent ],
      providers: [
        { provide: AuthService, useValue: fakeAuthService },
        { provide: Router, useValue: fakeRouter },
        { provide: ActivatedRoute, useValue: fakeActivateRoute },
        { provide: ToastrService, useValue: fakeToast }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should component form have 2 controls', () => {
    expect(component.form.contains('email')).toBeTruthy();
    expect(component.form.contains('password')).toBeTruthy();
  });

  it('should forms as invalid  if empty value', () => {
    const emailControl = component.form.get('email');
    const passwordControl = component.form.get('password');
    
    emailControl?.setValue('');
    passwordControl?.setValue('')
    
    expect(emailControl?.valid).toBeFalsy();
    expect(passwordControl?.valid).toBeFalsy();
  });

  it('should login have been called', () => {
    component.onSubmit();
    expect(fakeAuthService.login).toHaveBeenCalled();
  });

  it('should form have been disable whe onSubmit called', () => {
    const spy = spyOn(component.form, 'disable');
    component.onSubmit();
    expect(spy).toHaveBeenCalled();
  })

});
