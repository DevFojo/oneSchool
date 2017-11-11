import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class DepartmentService {

  constructor(private _http: Http) {
  } 
  
  getAll() {
    return this._http.get('/api/departments').map(result => result.json());
  }

}
