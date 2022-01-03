import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing'
import { AuthService } from './auth.service';

const expectedUrlRegister = '/api/auth/register';
const expectedUrlLogin = '/api/auth/login';

describe('AuthService', () => {
  let service: AuthService;
  let controller: HttpTestingController;
  let token = ''

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    controller = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should register method return user', () => {
    let user = {
      firstName: 'A',
      lastName: 'B',
      age: 30,
      email: 'demo2@demo.com',
      password: '123123'
    }

    let actualUser: any;

    service.register(user).subscribe(resultUser => actualUser = resultUser);

    const request = controller.expectOne(expectedUrlRegister);
    request.flush(
      {
        firstName: 'A',
        lastName: 'B',
        age: 30,
        email: 'demo2@demo.com',
        password: '123123'
      }
    );
    controller.verify();
    expect(actualUser).toEqual(user);
  });

  it('should login method return user', () => {
    let user = {
      email: 'demo2@demo.com',
      password: '123123'
    }

    let actualUser: any;

    service.login(user).subscribe(resultUser => actualUser = resultUser);
    const request = controller.expectOne(expectedUrlLogin);
    request.flush({email: 'demo2@demo.com', password: '123123'});
    controller.verify();

    expect(actualUser).toEqual(user);
  });

  it('should setToken method set new value token', () => {
    let newToken = '123';
    
    service.setToken(newToken);

    expect(service.token).toEqual(newToken);
  });

  it('should getToken method get value of token', () => {
    let newToken = '123';
    service.setToken(newToken);
    
    service.getToken();
    
    expect(service.token).toEqual(newToken);
  });

  it('should isAuthenticated return bolean', () => {
    let newToken = '123';
    service.setToken(newToken);

    let check = service.isAuthenticated();

    expect(check).toEqual(true);
  });

  it('should logOut clear token value', () => {
    let newToken = '123';
    service.setToken(newToken);

    service.logOut();

    expect(service.token).toEqual('');
  });
  
});
