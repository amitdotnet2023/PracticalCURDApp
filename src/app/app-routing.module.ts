import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDepartmentComponent } from './Department/add-department/add-department.component';
import { EditDepartmentComponent } from './Department/edit-department/edit-department.component';
import { AddEmployeeComponent } from './Employee/add-employee/add-employee.component';
import { EditEmployeeComponent } from './Employee/edit-employee/edit-employee.component';
import { ViewpageComponent } from './viewpage/viewpage.component';

const routes: Routes = [

  { path: 'adddepartment', component: AddDepartmentComponent },
  { path: 'editdepartment', component: EditDepartmentComponent },

  { path: 'addemployee', component: AddEmployeeComponent },
  { path: 'editemployee', component: EditEmployeeComponent },

  { path: '', redirectTo: 'viewpage', pathMatch: 'full' },
  { path: 'viewpage', component: ViewpageComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
