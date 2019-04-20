import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

import { Survey } from '../models/survey';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  private user: User;
  private authToken: any = null;

  //private endpoint = 'https://comp308-w2019-lesson10b.herokuapp.com/api/contact-list/';

  private endpoint = 'http://localhost:3000/api/survey/';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    })
  };

  constructor(private http: HttpClient) {
    this.user = new User();
  }

  public getList(): Observable<any> {
    this.loadToken();
    return this.http.get<any>(this.endpoint, this.httpOptions);
  }

  public getSurvey(survey: Survey): Observable<any> {
    this.loadToken();
    return this.http.get<any>(this.endpoint + 'edit/' + survey._id, this.httpOptions);
  }

  private loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', this.authToken);
  }
}
