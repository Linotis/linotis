import { Component, OnInit } from '@angular/core';
import { ILanguage } from 'src/app/data/interface/language.interface';
import { LanguageService } from 'src/app/data/service/language/language.service';

@Component({
  selector: 'app-language-selection',
  templateUrl: './language-selection.component.html',
  styleUrls: ['./language-selection.component.scss']
})
export class LanguageSelectionComponent implements OnInit {

  languages: ILanguage[] = [];

  constructor(private languageService: LanguageService) {}

  ngOnInit(): void {
    this.languageService.getLanguages().subscribe( data => {
      this.languages = data;
    });
  }

}
