import { Component, OnInit } from '@angular/core';
import { QuestionListService } from 'src/app/services/question-list.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute } from '@angular/router';

import { Question } from 'src/app/models/question.service';

@Component({
  selector: 'app-question-delete',
  templateUrl: './question-delete.component.html',
  styleUrls: ['./question-delete.component.css']
})
export class QuestionDeleteComponent implements OnInit {
  title: string;
  question: Question;

  constructor(
    private activatedRoute: ActivatedRoute,
    private flashMessage: FlashMessagesService,
    private contactListService: QuestionListService,
    private router: Router
  ) { }

  ngOnInit() {
    this.title = this.activatedRoute.snapshot.data.title;
    this.question = new Question();

    this.activatedRoute.params.subscribe(params => {
      this.question._id = params.id;
    });

    this.deleteQuestion(this.question);
  }

  private deleteQuestion(question: Question): void {
    this.contactListService.deleteQuestion(question).subscribe(data => {
      if (data.success) {
        this.flashMessage.show(data.msg, {cssClass: 'alert-warning', timeOut: 3000});
        this.router.navigate(['/question/question-list']);
      } else {
        this.flashMessage.show('Delete Question Failed', {cssClass: 'alert-danger', timeOut: 3000});
        this.router.navigate(['/question/question-list']);
      }
    });
  }

}
