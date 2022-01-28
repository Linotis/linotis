import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { ILanguage } from 'src/app/data/interface/language.interface';
import { LanguageService } from 'src/app/data/service/language/language.service';
import { UserService } from 'src/app/data/service/user/user.service';

@Component({
  selector: 'app-language-selection',
  templateUrl: './language-selection.component.html',
  styleUrls: ['./language-selection.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class LanguageSelectionComponent implements OnInit {

  @Input() userData: any;
  @Input() languageChoosen!: boolean;

  @Output() languageChange = new EventEmitter<boolean>();
  
  langIcon = '';
  languages$!: Observable<ILanguage[]>;
  constructor(private languageService: LanguageService, private userService: UserService) {}

  ngOnInit(): void {
    console.log(this.userData);
    this.languages$ = this.languageService.getLanguages();
    
  }

  chooseLanguage(id: string) {
    let updatedLanguages = [
      {"_id": id}
    ]
    this.userService.updateUserLanguages(updatedLanguages).subscribe(data => {
      this.languageChoosen = true;
      this.languageChange.emit(this.languageChoosen);
      console.log(data);
      console.log(this.languageChoosen);
    });
    console.log(id);
  }

}
