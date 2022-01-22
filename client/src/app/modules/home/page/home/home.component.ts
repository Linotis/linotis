import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/data/service/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  languageChoosen: boolean = false;
  userLanguages!: any;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getInfo().subscribe(data => {
      this.userLanguages = data.languages;

      if(this.userLanguages) {
        this.languageChoosen = true;
        console.log(this.userLanguages);
      }
    });
  }

  ngAfterInit() {

  }

}
