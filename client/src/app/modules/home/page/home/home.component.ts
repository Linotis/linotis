import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/data/service/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  userData!: object;
  languageChoosen: boolean = true;

  userLanguages: [] | undefined;

  constructor(private userService: UserService) { }
  
  ngOnInit(): void {
    this.userService.getInfo().subscribe(data => {
      this.userLanguages = data.languages;
      this.userData = data;
      console.log(this.userData);
      console.log(this.languageChoosen);
      if(this.userLanguages!.length == 0) {
        this.languageChoosen = false;
        //console.log(this.userLanguages);
      }
    });
  }

  languageChange(event: boolean) {
    this.languageChoosen = event;
  }
}
