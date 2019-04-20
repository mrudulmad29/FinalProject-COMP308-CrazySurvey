import { Component, OnInit } from '@angular/core';
import { QuestionListService } from 'src/app/services/question-list.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute } from '@angular/router';

import { Question } from 'src/app/models/question.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  title: string;
  question: Question;

  constructor(
    private activatedRoute: ActivatedRoute,
    private flashMessage: FlashMessagesService,
    private questionListService: QuestionListService,
    private router: Router
  ) { }

  ngOnInit() {
    this.title = this.activatedRoute.snapshot.data.title;
    this.question = new Question();

    this.activatedRoute.params.subscribe(params => {
      this.question._id = params.id;
    });

    if (this.title === 'Edit Question') {
      this.getQuestion(this.question);
    }
  }

  private getQuestion(question: Question): void {
    this.questionListService.getQuestion(question).subscribe(data => {
      this.question = data.question;
    });
  }

   onDetailsPageSubmit(): void {
    switch (this.title) {
      case 'Add Question':
      this.questionListService.addQuestion(this.question).subscribe(data => {
        if (data.success) {
          this.flashMessage.show(data.msg, {cssClass: 'alert-success', timeOut: 3000});
          this.router.navigate(['/question/question-list']);
        } else {
          this.flashMessage.show('Add Question Failed', {cssClass: 'alert-danger', timeOut: 3000});
          this.router.navigate(['/question/question-list']);
        }
      });
      break;

      case 'Edit Question':
      this.questionListService.editQuestion(this.question).subscribe(data => {
        if (data.success) {
          this.flashMessage.show(data.msg, {cssClass: 'alert-success', timeOut: 3000});
          this.router.navigate(['/question/question-list']);
        } else {
          this.flashMessage.show('Edit Question Failed', {cssClass: 'alert-danger', timeOut: 3000});
          this.router.navigate(['/question/question-list']);
        }
      });
      break;
    }
  }

}
