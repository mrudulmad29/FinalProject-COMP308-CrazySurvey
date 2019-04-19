import { Component, OnInit } from '@angular/core';
import { QuestionListService } from 'src/app/services/question-list.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute } from '@angular/router';



import { Question } from 'src/app/models/question.service';
@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit {
  questions: Question[];

  constructor(
    private questionListService: QuestionListService,
    private flashMessage: FlashMessagesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.questions = new Array<Question>();

    this.displayQuestionList();
  }

  private onDeleteClick(): void {
    if(!confirm('Are You Sure?')) {
      this.router.navigate(['/question/question-list']);
    }
  }

  displayQuestionList(): void {
    this.questionListService.getList().subscribe(data => {
      if(data.success) {
        this.questions = data.questionList;
      } else {
        this.flashMessage.show('User must be logged-in', {cssClass: 'alert-danger', timeOut: 3000});
      }
    });
  }

}
