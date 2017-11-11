import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class FacultyService {

  constructor(private _http: Http) {
  }
  
  getAll() {
    return this._http.get('/api/faculties').map(result => result.json());
  }

}
