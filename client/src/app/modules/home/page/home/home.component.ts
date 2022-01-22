import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/data/service/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  languageChoosen: boolean = true;
  userLanguages: [] | undefined;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getInfo().subscribe(data => {
      this.userLanguages = data.languages;

      if(this.userLanguages!.length == 0) {
        this.languageChoosen = false;
        console.log(this.userLanguages);
      }
    });
  }
}
