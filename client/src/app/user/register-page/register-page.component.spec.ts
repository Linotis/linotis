import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';

import { RegisterPageComponent } from './register-page.component';

describe('RegisterPageComponent', () => {
  let component: RegisterPageComponent;
  let fixture: ComponentFixture<RegisterPageComponent>;

  let fakeAuthService: AuthService;
  let fakeRouter: Router;

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
      navigate: (undefined)
    });

    await TestBed.configureTestingModule({
      declarations: [ RegisterPageComponent ],
      providers: [
        { provide: AuthService, useValue: fakeAuthService },
        { provide: Router, useValue: fakeRouter },
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
