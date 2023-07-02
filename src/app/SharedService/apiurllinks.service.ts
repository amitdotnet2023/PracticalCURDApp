import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiurllinksService {

  DepartmentGetAll: any
  DepartmentGetById: any
  DepartmentCreate: any
  DepartmentUpdate: any
  DepartmentDelete: any

  EmployeeGetAll: any
  EmployeeGetById: any
  EmployeeCreate: any
  EmployeeUpdate: any
  EmployeeDelete: any
  SearchEmployee:any

  constructor() {

    // Department Rest Api
    this.DepartmentGetAll = environment.apiKey + 'Department'
    this.DepartmentGetById = environment.apiKey + 'Department/'
    this.DepartmentCreate = environment.apiKey + 'Department'
    this.DepartmentUpdate = environment.apiKey + 'Department'
    this.DepartmentDelete = environment.apiKey + 'Department/'

    // Employee Rest Api
    this.EmployeeGetAll = environment.apiKey + 'Employee'
    this.EmployeeGetById = environment.apiKey + 'Employee/'
    this.EmployeeCreate = environment.apiKey + 'Employee'
    this.EmployeeUpdate = environment.apiKey + 'Employee'
    this.EmployeeDelete = environment.apiKey + 'Employee/'
    this.SearchEmployee = environment.apiKey + 'Employee/SearchEmployee'

  }
}
