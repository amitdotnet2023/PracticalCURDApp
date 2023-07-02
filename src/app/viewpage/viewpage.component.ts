import { Component, OnInit } from '@angular/core';
import { ApihttpService } from '../SharedService/apihttp.service';
import { ApiurllinksService } from '../SharedService/apiurllinks.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { PagerService } from '../SharedService/pager.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-viewpage',
  templateUrl: './viewpage.component.html',
  styleUrls: ['./viewpage.component.scss']
})
export class ViewpageComponent implements OnInit {

  EmployeeList: any = []
  DepartmentList: any = []

  pageNumber: number = 1;
  pageSize: number = 10;
  totalRecords: any = 0;
  totalPages: number = 0;
  searchParameters: any;

  SearchEmployeeFrom!: FormGroup
  isSubmitted: boolean = false

  constructor(private restapiSer: ApihttpService, private apiUrlSer: ApiurllinksService,
    private router: Router, private pagerService: PagerService, private fb: FormBuilder) {

  }


  ngOnInit(): void {

    this.SearchEmployeeFrom = this.fb.group({
      searchParameters: ['', Validators.required]
    })


    // Employee List All Get api call
    this.GetAllEmployee();

    // Department List All Get api call

    this.GetAllDepartment();

  }

  GetAllEmployee() {

    let pagination = {
      PageNumber: this.pageNumber,
      PageSize: this.pageSize
    }

    this.restapiSer.getPaginationList(this.apiUrlSer.EmployeeGetAll, pagination).subscribe({
      next: (value) => {
        this.EmployeeList = value
        console.log(this.EmployeeList);

        this.pageSize = this.EmployeeList.pageSize
        this.totalRecords = this.EmployeeList.totalRecords
        this.totalPages = this.EmployeeList.totalPages
      },
      error: (err) => {
        console.log(err);
      },
    })
  }


  GetAllDepartment() {
    this.restapiSer.get(this.apiUrlSer.DepartmentGetAll).subscribe({
      next: (value) => {
        this.DepartmentList = value
        console.log(this.DepartmentList);
      },
      error: (err) => {
        console.log(err);
      },
    })
  }


  // delete department

  deleteDepartment(departmentId: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "Are you sure you want to delete this department?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete'
    }).then((result) => {
      if (result.isConfirmed) {

        this.restapiSer.delete(this.apiUrlSer.DepartmentDelete + departmentId).subscribe({
          next: (value) => {
            this.GetAllDepartment();
            console.log(value);
          },
          error: (err) => {
            console.log(err);
          },
        })

        Swal.fire(
          'Deleted!',
          'Your department has been deleted.',
          'success'
        )
      }
    })
  }


  editDepart(id: any) {
    this.router.navigate(['/editdepartment'], { queryParams: { dpid: id } });
  }


  // delete employee

  deleteEmployee(employeeId: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "Are you sure you want to delete this employee?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete'
    }).then((result) => {
      if (result.isConfirmed) {

        this.restapiSer.delete(this.apiUrlSer.EmployeeDelete + employeeId).subscribe({
          next: (value) => {
            this.GetAllEmployee();
            console.log(value);
          },
          error: (err) => {
            console.log(err);
          },
        })

        Swal.fire(
          'Deleted!',
          'Your employee has been deleted.',
          'success'
        )
      }
    })
  }


  editemployee(id: any) {
    this.router.navigate(['/editemployee'], { queryParams: { empid: id } });
  }


  onTableDataChange(event: any) {
    this.pageNumber = event;
    this.GetAllEmployee();
  }
  

  get f() {
    return this.SearchEmployeeFrom.controls;
  }

  SearchEmployeeFLS() {

    this.totalRecords = 0

    this.isSubmitted = true

    if (this.SearchEmployeeFrom.valid) {
      this.searchParameters = this.SearchEmployeeFrom.controls['searchParameters'].value
      let pagination = {
        PageNumber: this.pageNumber,
        PageSize: this.pageSize,
        searchParameters: this.searchParameters
      }
      this.restapiSer.getPaginationList(this.apiUrlSer.SearchEmployee, pagination).subscribe({
        next: (value) => {

          this.EmployeeList = value

          if (this.EmployeeList.totalRecords == 0) {
            Swal.fire({
              title: 'Error!',
              text: 'Record not found',
              icon: 'error',
              showCancelButton: true,
              cancelButtonColor: '#d33',
            })
            this.SearchEmployeeFrom.reset()
            this.isSubmitted = false
          } else {
            this.EmployeeList = value
            console.log(this.EmployeeList);
            this.pageSize = this.EmployeeList.pageSize
            this.totalRecords = this.EmployeeList.totalRecords
            this.totalPages = this.EmployeeList.totalPages
          }

        },
        error: (err) => {
          console.log(err);
        },
      })
    }

  }

  resetsearch() {
    this.SearchEmployeeFrom.reset();
    this.isSubmitted = false
    this.GetAllEmployee();
  }

}
