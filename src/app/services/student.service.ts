import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class StudentService {
  result: any;

  constructor(private _http: Http) {
  }

  getAll() {
    return this._http.get("/api/students").map(result => result.json().data);
  }

}
