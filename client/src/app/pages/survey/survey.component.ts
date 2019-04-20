

import {Router, ActivatedRoute } from '@angular/router';
import {Survey} from 'src/app/models/survey'
import {SurveyService} from 'src/app/services/survey.service'
import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import {Question} from 'src/app/models/question.service'



@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {

  title: string;
  survey: Survey;
  question:Question[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private flashMessage: FlashMessagesService,
    private surveyService: SurveyService,
    private router: Router
  ) { }

  ngOnInit() {
  }


  private getSurvey(survey: Survey): void {
    this.surveyService.getSurvey(survey).subscribe(data => {
      this.survey = data.survey;
      this.question = this.survey.questionArray;

      for (let index = 0; index < this.question.length; index++) 
      {

       // const answer = new Answer();

      //  answer.question = this.questions[index].question;

       // this.answers[index] = answer;

      }

    });	  

}}