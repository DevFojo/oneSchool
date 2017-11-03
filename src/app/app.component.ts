import { Component } from '@angular/core';
import { StudentService } from './services/student.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  students: any;
  title = 'app';

  constructor(private _studentService: StudentService){
    debugger;
    this._studentService.getAll().subscribe(res => this.students = res);

  }
}
