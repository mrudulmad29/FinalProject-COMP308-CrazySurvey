import { Component, OnInit } from '@angular/core';
import { BasePageComponent } from 'src/app/partials/base-page/base-page.component';
import { ActivatedRoute } from '@angular/router';
import {AuthService} from './../../services/auth.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent extends BasePageComponent implements OnInit {
  constructor(
    route: ActivatedRoute,
    private authService: AuthService
    ) {
    super(route);
  }

  ngOnInit() {
  }

  isLoggedIn(): boolean {
    return this.authService.loggedIn();
  }

}
