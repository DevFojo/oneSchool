import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { FacultyService } from '../../services/faculty.service';
import { DepartmentService } from '../../services/department.service';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  departmentList: Array<any>;
  departments: Array<any>;
  faculties: Array<any>;
  facultyList: Array<any>;
  students: Array<any>;
  newStudent: any;

  constructor(private _studentService: StudentService, private _departmentService: DepartmentService, private _facultyService: FacultyService) {

  }

  ngOnInit() {
    this.refreshStudentList();
    this.studentModelInit();
    this.refreshFacultyList();
    this.refreshDepartmentList();
    $('.ui.dropdown').dropdown();
    this.validationInit();
  }

  refreshStudentList() {
    this._studentService.getAll().subscribe(res => this.students = res);
  }
  refreshFacultyList() {
    this._facultyService.getAll().subscribe(res => this.faculties = res);

  }
  refreshDepartmentList() {
    this._departmentService.getAll().subscribe(res => this.departmentList = res);
  }

  onFacultySelected() {
    var selectedFaculty = $('#faculty').val();
    $('#department').val('Select a Department').change();
    this.departments = this.departmentList.filter(d => d.faculty == selectedFaculty);
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
    if ($('#addStudentForm').form('is valid')) {
      console.log(this.newStudent);
      this._studentService.create(this.newStudent).subscribe(res => {
        console.log(res);
        this.refreshStudentList();
      });
      $('#addStudentForm').modal('hide');
      this.studentModelInit();
    }

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

  validationInit(): any {
    $('.ui.form')
      .form({
        fields: {
          firstName: {
            identifier: 'firstName',
            rules: [
              {
                type: 'empty',
                prompt: 'Please enter your first name'
              }
            ]
          },
          lastName: {
            identifier: 'lastName',
            rules: [
              {
                type: 'empty',
                prompt: 'Please enter your last name'
              }
            ]
          },
          gender: {
            identifier: 'gender',
            rules: [
              {
                type: 'empty',
                prompt: 'Please select a gender'
              },
              {
                type: 'not[default]',
                prompt: 'Please select a gender'
              }
            ]
          },
          dob: {
            identifier: 'dob',
            rules: [
              {
                type: 'empty',
                prompt: 'Please select a birth date'
              }
            ]
          },
          matricNo: {
            identifier: 'matricNo',
            rules: [
              {
                type: 'empty',
                prompt: 'Please enter a matric number'
              },
              {
                type: 'minLength[6]',
                prompt: 'Matric number must be at least {ruleValue} characters'
              }
            ]
          },
          faculty: {
            identifier: 'faculty',
            rules: [
              {
                type: 'empty',
                prompt: 'Please select a faculty'
              },
              {
                type: 'not[default]',
                prompt: 'Please select a faculty'
              }
            ]
          },
          department: {
            identifier: 'department',
            rules: [
              {
                type: 'empty',
                prompt: 'Please select a department'
              },
              {
                type: 'not[default]',
                prompt: 'Please select a department'
              }
            ]
          },
          level: {
            identifier: 'level',
            rules: [
              {
                type: 'empty',
                prompt: 'Please select a level'
              },
              {
                type: 'not[default]',
                prompt: 'Please select a level'
              }
            ]
          }
        },
        inline: true
      })
      ;
  }

}
