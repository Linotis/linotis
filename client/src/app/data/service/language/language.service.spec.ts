import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { LanguageService } from './language.service';

const expectedUrlGetLang = '/api/languages';

describe('LanguageService', () => {
  let service: LanguageService;
  let controller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LanguageService]
    });
    service = TestBed.inject(LanguageService);
    controller = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should getLanguages return languages', () => {
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

    let actualLanguages: any;

    service.getLanguages().subscribe(result => actualLanguages = result);

    const request = controller.expectOne(expectedUrlGetLang);

    request.flush([
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
      ]);

    controller.verify();
    expect(actualLanguages).toEqual(languages);
  });
});
