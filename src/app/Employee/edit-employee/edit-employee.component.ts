import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApihttpService } from 'src/app/SharedService/apihttp.service';
import { ApiurllinksService } from 'src/app/SharedService/apiurllinks.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss']
})
export class EditEmployeeComponent  implements OnInit {

  issubmitted: boolean = false

  EditEmployeeForm!: FormGroup;

  DepartmentList: any = []

  dateFormat = "yyyy-MM-dd";
  language = "en";
  
  GivenDate: any;
  CurrentDate = new Date();

  constructor(private route: ActivatedRoute,private fb: FormBuilder, private router: Router, private restapiSer: ApihttpService, private apiUrlSer: ApiurllinksService,private toastrService: ToastrService) {

  }

  ngOnInit(): void {


    this.EditEmployeeForm = this.fb.group({
      employeeId:[''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      departmentId: ['', Validators.required],
      salary: ['', Validators.required],
      joinDate: ['', Validators.required],
      isActive: [true, Validators.required],
    })

    this.route.queryParams.subscribe((params) => {

      this.restapiSer.get(this.apiUrlSer.EmployeeGetById + params.empid).subscribe({
        next: (value) => {
          console.log(value);

          this.EditEmployeeForm.controls['employeeId'].setValue(value.employeeId);
          this.EditEmployeeForm.controls['firstName'].setValue(value.firstName);
          this.EditEmployeeForm.controls['lastName'].setValue(value.lastName);
          this.EditEmployeeForm.controls['departmentId'].setValue(value.departmentId);
          this.EditEmployeeForm.controls['salary'].setValue(value.salary);
          this.EditEmployeeForm.controls['joinDate'].setValue(this.formatFormDate(value.joinDate));
        },
      })

    });


    // Department List All Get api call

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

  // validation form

  get f() {
    return this.EditEmployeeForm.controls
  }

  //Employee from Submit

  OnSubmit() {
    this.issubmitted = true
    if (this.EditEmployeeForm.valid) {
      console.log(this.EditEmployeeForm.value);

      this.restapiSer.put(this.apiUrlSer.EmployeeUpdate, this.EditEmployeeForm.value).subscribe({
        next: (value) => {
          console.log(value);
          this.router.navigate(['/viewpage'])
          this.toastrService.success('Update employee successfully', 'Success!');
        },
        error: (err) => {
          console.log(err);
        },
      })
    }
  }


  formatFormDate(date: Date) {
    return formatDate(date, this.dateFormat, this.language);
  }

  DateCheck(date: any) {
    this.GivenDate = date.value
    this.GivenDate = new Date(this.GivenDate);
    if (this.GivenDate > this.CurrentDate) {
      console.log(date.value);
      this.toastrService.warning('Wrong date', 'Error!');
    }
  }

  decimalFilter(event: any) {
    const reg = /^-?\d*(\.\d{0,2})?$/;
    let input = event.target.value + String.fromCharCode(event.charCode);
   if (!reg.test(input)) {
        event.preventDefault();
    }
 }

}
