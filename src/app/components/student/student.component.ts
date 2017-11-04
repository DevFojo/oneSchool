import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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

  constructor(private _studentService: StudentService, private _addStudentFormBuilder: FormBuilder) {
    this.addStudentForm = _addStudentFormBuilder.group({
      'firstName': ['', Validators.required],
      'lastName': ['', Validators.required],
      'gender': ['', Validators.minLength(1)],
      'faculty': ['', Validators.required],
      'dob': [],
      'matricNo': [null, Validators.required],
      'department': [null, Validators.required],
      'level': [null, Validators.required],
      'validate': ''
    }, )
  }

  ngOnInit() {
    this._studentService.getAll().subscribe(res => this.students = res);
    $('.ui.dropdown')
      .dropdown();
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
  add(student: any) {
    console.log(student);
    var newStudent = {
      'firstName': student.firstName,
      'lastName': student.lastName,
      'gender': student.gender,
      'faculty': student.faculty,
      'dob': student.dob,
      'matricNo': student.matricNo,
      'department': student.department,
      'level': student.level
    };
    this._studentService.create(newStudent).subscribe(res => this.students.push(res));
  }
  loadDeleteConfirmation() {
    console.log('about to delete');
  }

}
