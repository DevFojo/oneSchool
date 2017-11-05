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
  newStudent: any;
  selectedStudent: any;

  constructor(private _studentService: StudentService, private _addStudentFormBuilder: FormBuilder) {

  }

  ngOnInit() {
    this._studentService.getAll().subscribe(res => this.students = res);
    $('.ui.dropdown').dropdown();
    this.newStudent = {
      'firstName': '',
      'lastName': '',
      'gender': '',
      'faculty': '',
      'dob': '',
      'matricNo': '',
      'department': '',
      'level': ''
    }
  }


  loadAddStudentModal() {
    $('#addStudentForm')
      .modal('show');
  }

  loadEditStudentModal(student: any) {
    console.log(student);
    this.selectedStudent = student;
    $('#editStudentForm')
      .modal('show');
  }

  loadStudentDetailsModal(student: any) {
    console.log(student);
    $('#studentDetails-name').html(student.firstName + ' ' + student.lastName);
    $('#studentDetails-matricNo').html(student.matricNo);
    $('#studentDetails-firstName').html(student.firstName);
    $('#studentDetails-lastName').html(student.lastName);
    $('#studentDetails-gender').html(student.gender);
    $('#studentDetails-dob').html(student.dob);
    $('#studentDetails-department').html(student.department);
    $('#studentDetails-faculty').html(student.faculty);
    $('#studentDetails-level').html(student.level);
    $('#viewStudentForm')
      .modal('show');
  }
  add() {
    console.log(this.newStudent);
    var newStudent = {
      'firstName': this.newStudent.firstName,
      'lastName': this.newStudent.lastName,
      'gender': this.newStudent.gender,
      'faculty': this.newStudent.faculty,
      'dob': this.newStudent.dob,
      'matricNo': this.newStudent.matricNo,
      'department': this.newStudent.department,
      'level': this.newStudent.level
    };
    this._studentService.create(newStudent).subscribe(res => this.students.push(res));
  }
  loadDeleteConfirmation() {
    console.log('about to delete');
  }

}
