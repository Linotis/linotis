import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing'

import { UserService } from './user.service';

const expectedUrlGetInfo = '/api/user'

describe('UserService', () => {
  let service: UserService;
  let controller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
    service = TestBed.inject(UserService);
    controller = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should getInfo return IUser', () => {
    let user = {
      firstName: 'A',
      lastName: 'B',
      age: 30,
      email: 'demo2@demo.com',
      password: '123123'
    }

    let actualUser: any;

    service.getInfo().subscribe(result => actualUser = result);

    const request = controller.expectOne(expectedUrlGetInfo);

    request.flush({
      firstName: 'A',
      lastName: 'B',
      age: 30,
      email: 'demo2@demo.com',
      password: '123123'
    });

    controller.verify();

    expect(actualUser).toEqual(user);
  });

  it('should updateUserInfo return IUser', () => {

    let user = {
      firstName: 'A',
      lastName: 'B',
      age: 30,
      email: 'demo2@demo.com',
      password: '123123',
      languages: [
        {
          _id: '1',
          name: 'test',
          icon: 'test'
        },
        {
          _id: '2',
          name: 'test1',
          icon: 'test1'
        }
      ]
    };

    let languages = [
      {
        _id: '1',
        name: 'test',
        icon: 'test'
      },
      {
        _id: '2',
        name: 'test1',
        icon: 'test1'
      }
    ];

    let actualUser: any;
    service.updateUserLanguages(languages).subscribe(result => actualUser = result);
    
    const request = controller.expectOne(expectedUrlGetInfo);

    request.flush({
      firstName: 'A',
      lastName: 'B',
      age: 30,
      email: 'demo2@demo.com',
      password: '123123',
      languages: [
        {
          _id: '1',
          name: 'test',
          icon: 'test'
        },
        {
          _id: '2',
          name: 'test1',
          icon: 'test1'
        }
      ]
    });
    
    controller.verify();
    expect(actualUser).toEqual(user);
  });


});
