import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { ILanguage } from 'src/app/data/interface/language.interface';
import { LanguageService } from 'src/app/data/service/language/language.service';
import { UserService } from 'src/app/data/service/user/user.service';

import { LanguageSelectionComponent } from './language-selection.component';

describe('LanguageSelectionComponent', () => {
  let component: LanguageSelectionComponent;
  let fixture: ComponentFixture<LanguageSelectionComponent>;

  let fakeUserService: UserService;
  let fakeLanguageService: LanguageService;
  let language: Promise<ILanguage[]>;
  // let language = {
  //   _id: '1',
  //   name: 'test1',
  //   icon: '123',
  //   collections: []

  // }

  beforeEach(async () => {
    fakeUserService = jasmine.createSpyObj<UserService>('UserService', {}, {
      updateUserLanguages: undefined
    });

    fakeLanguageService = jasmine.createSpyObj<LanguageService>('LanguageService', {}, {
      getLanguages: undefined
    });

    await TestBed.configureTestingModule({
      declarations: [ LanguageSelectionComponent ],
      providers: [
        { provide: UserService, useValue: fakeUserService },
        { provide: LanguageService, useValue: fakeLanguageService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
