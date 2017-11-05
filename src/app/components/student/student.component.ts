import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  students: Array<any>;
  newStudent: any;

  constructor(private _studentService: StudentService) {

  }

  ngOnInit() {
    this.refreshStudentList();
    this.studentModelInit();
    $('.ui.dropdown').dropdown();

  }

  refreshStudentList() {
    this._studentService.getAll().subscribe(res => this.students = res);

  }


  loadAddStudentModal() {
    $('#addStudentForm').modal('show');
  }

  loadEditStudentModal(student: any) {
    console.log(student);
    this.newStudent = student;
    $('#editStudent-gender').val(student.gender).change();
    $('#editStudentForm').modal('show');
  }

  loadStudentDetailsModal(student: any) {
    console.log(student);
    this.newStudent = student;
    $('#studentDetails-name').html(student.firstName + ' ' + student.lastName);
    $('#studentDetails-matricNo').html(student.matricNo);
    $('#studentDetails-firstName').html(student.firstName);
    $('#studentDetails-lastName').html(student.lastName);
    $('#studentDetails-gender').html(student.gender);
    $('#studentDetails-dob').html(student.dob);
    $('#studentDetails-department').html(student.department);
    $('#studentDetails-faculty').html(student.faculty);
    $('#studentDetails-level').html(student.level);
    $('#viewStudentForm').modal('show');
  }
  studentModelInit() {
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
  add() {
    console.log(this.newStudent);
    this._studentService.create(this.newStudent).subscribe(res => {
      console.log(res);
      this.refreshStudentList();
    });
    $('#addStudentForm').modal('hide');
    this.studentModelInit();

  }

  loadDeleteConfirmation(student: any) {
    this.newStudent = student;
    $('#deleteStudentConfirmation').modal('show');
    console.log(this.newStudent);
  }

  delete() {
    this._studentService.delete(this.newStudent).subscribe(res => {
      console.log(res);
      this.refreshStudentList();
    });
    $('#deleteStudentConfirmation').modal('hide');
    this.studentModelInit();
  }
  edit() {
    this._studentService.update(this.newStudent).subscribe(res => {
      console.log(res);
    });
    $('#editStudentForm').modal('hide');    
    this.studentModelInit();
  }

}
