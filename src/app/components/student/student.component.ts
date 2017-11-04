import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Student } from '../../models/student';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  students: Array<any>;
  addStudentForm: FormGroup;
  post: any;                     // A property for our submitted form
  description: string = '';
  name: string = '';
  student: any;

  constructor(private _studentService: StudentService, private _addStudentFormBuilder: FormBuilder) {

  }

  ngOnInit() {
    this._studentService.getAll().subscribe(res => this.students = res);
    $('.ui.dropdown').dropdown();
    this.student = {
      'firstName': '',
      'lastName': 'this.student.lastName',
      'gender': 'this.student.gender',
      'faculty': 'this.student.faculty',
      'dob': 'this.student.dob',
      'matricNo': 'this.student.matricNo',
      'department': 'this.student.department',
      'level': 'this.student.level'
    }
  }

  loadAddStudentModal() {
    $('#addStudentForm')
      .modal('show');
  }

  loadEditStudentModal(student: any) {
    console.log(student);
    $('#editStudentForm')
      .modal('show');
  }

  loadStudentDetailsModal(student: any) {
    console.log(student);
    $('#viewStudentForm')
      .modal('show');
  }
  add() {
    console.log(this.student);
    var newStudent = {
      'firstName': this.student.firstName,
      'lastName': this.student.lastName,
      'gender': this.student.gender,
      'faculty': this.student.faculty,
      'dob': this.student.dob,
      'matricNo': this.student.matricNo,
      'department': this.student.department,
      'level': this.student.level
    };
    this._studentService.create(newStudent).subscribe(res => this.students.push(res));
  }
  loadDeleteConfirmation() {
    console.log('about to delete');
  }

}
