import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from  '@angular/common/http';
import { AddDepartmentComponent } from './Department/add-department/add-department.component';
import { EditDepartmentComponent } from './Department/edit-department/edit-department.component';
import { AddEmployeeComponent } from './Employee/add-employee/add-employee.component';
import { EditEmployeeComponent } from './Employee/edit-employee/edit-employee.component';
import { ViewpageComponent } from './viewpage/viewpage.component';
import { AlphabetOnlyDirective } from './alphabet-only.directive';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    AppComponent,
    AddDepartmentComponent,
    EditDepartmentComponent,
    AddEmployeeComponent,
    EditEmployeeComponent,
    ViewpageComponent,
    AlphabetOnlyDirective // alphabet only directive
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    ToastrModule.forRoot({
      closeButton: true,
      timeOut: 5000, // 5 seconds
      progressBar: true,
    }),  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
