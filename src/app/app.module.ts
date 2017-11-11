import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { StudentService } from './services/student.service';

import { StudentComponent } from './components/student/student.component';
import { HomeComponent } from './components/home/home.component';

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FacultyService } from './services/faculty.service';
import { DepartmentService } from './services/department.service';

const appRoutes: Routes = [
  { path: 'students', component: StudentComponent },
  { path: '', component: HomeComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    StudentComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    StudentService,
    DepartmentService,
    FacultyService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
