import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { ActiveToast, ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { AuthService } from '../../../../core/service/auth.service';

import { RegisterPageComponent } from './register-page.component';

describe('RegisterPageComponent', () => {
  let component: RegisterPageComponent;
  let fixture: ComponentFixture<RegisterPageComponent>;
  let toast: ActiveToast<any>;

  let fakeAuthService: AuthService;
  let fakeRouter: Router;
  let fakeToast: ToastrService;
  let navigateStatus: Promise<boolean>

  let testUser = {
    firstName: 'A',
    lastName: 'B',
    age: 30,
    email: 'demo2@demo.com',
    password: '123123'
  }


  beforeEach(async () => {
    fakeAuthService = jasmine.createSpyObj<AuthService>('AuthService',{
      register: of(testUser)
    });

    fakeRouter = jasmine.createSpyObj<Router>('Router', {
      navigate: navigateStatus
    });

    fakeToast = jasmine.createSpyObj<ToastrService>('ToastrService', {
      success: toast
      
    });

    await TestBed.configureTestingModule({
      declarations: [ RegisterPageComponent ],
      providers: [
        { provide: AuthService, useValue: fakeAuthService },
        { provide: Router, useValue: fakeRouter },
        { provide: ToastrService, useValue: fakeToast }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should register have been called', () => {
    component.onSubmit();
    expect(fakeAuthService.register).toHaveBeenCalled();
  });

  it('should form have been disable whe onSubmit called', () => {
    const spy = spyOn(component.form, 'disable');
    component.onSubmit();
    expect(spy).toHaveBeenCalled();
  })
});
