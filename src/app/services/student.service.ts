import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class StudentService {
  result: any;

  constructor(private _http: Http) {
  }

  getAll() {
    return this._http.get('/api/students').map(result => result.json());
  }

  create(student: any) {
    return this._http.post('/api/students', student).map(result => result.json());
  }

  update(student: any) {
    return this._http.put('/api/student/' + student._id, student).map(result => result.json());
  }

  delete(student: any) {
    return this._http.delete('/api/student/' + student._id).map(result => result.json());
  }
}
