import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { AuthService } from './user/shared/services/auth.service';

describe('AppComponent', () => {

  let fakeAuthService: AuthService;
  
  beforeEach(async () => {
    fakeAuthService = jasmine.createSpyObj<AuthService>('AuthService',{
      setToken: (undefined)
    });
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        { provide: AuthService, useValue: fakeAuthService }
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
