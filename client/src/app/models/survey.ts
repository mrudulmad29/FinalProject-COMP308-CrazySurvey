import {Question} from 'src/app/models/question.service'

export class Survey {
    _id: string;
    surveyTitle: string;
    questionArray: Question[];
}
