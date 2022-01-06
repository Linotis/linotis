import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from 'src/app/core/service/auth.service';

import { AuthLayoutComponent } from './auth-layout.component';

describe('AuthLayoutComponent', () => {
  let component: AuthLayoutComponent;
  let fixture: ComponentFixture<AuthLayoutComponent>;
  let fakeAuthService: AuthService;
  let fakeRouter: Router;

  beforeEach(async () => {
    
    fakeAuthService = jasmine.createSpyObj<AuthService>('AuthService',{
      isAuthenticated: true
    });

    fakeRouter = jasmine.createSpyObj<Router>('Router', {
      navigate: (undefined)
    });

    await TestBed.configureTestingModule({
      declarations: [ AuthLayoutComponent ],
      providers: [
        { provide: AuthService, useValue: fakeAuthService },
        { provide: Router, useValue: fakeRouter }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate has been call when ngOnInit', () => {
    component.ngOnInit();
    expect(fakeRouter.navigate([])).toBeUndefined();
  })
});
