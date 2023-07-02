import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApihttpService } from 'src/app/SharedService/apihttp.service';
import { ApiurllinksService } from 'src/app/SharedService/apiurllinks.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {

  issubmitted: boolean = false

  EmployeeForm!: FormGroup;

  DepartmentList: any = []

  GivenDate: any;
  CurrentDate = new Date();


  constructor(private fb: FormBuilder, private router: Router, private restapiSer: ApihttpService, private apiUrlSer: ApiurllinksService,private toastrService: ToastrService) {

  }

  ngOnInit(): void {

    this.EmployeeForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      departmentId: ['', Validators.required],
      salary: ['', Validators.required],
      joinDate: ['', Validators.required],
      isActive: [true, Validators.required],
    })

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
    return this.EmployeeForm.controls
  }

  //Employee from Submit

  OnSubmit() {
    this.issubmitted = true
    if (this.EmployeeForm.valid) {
      console.log(this.EmployeeForm.value);

      this.restapiSer.post(this.apiUrlSer.EmployeeCreate, this.EmployeeForm.value).subscribe({
        next: (value) => {
          console.log(value);
          this.router.navigate(['/viewpage'])
          this.toastrService.success('Add employee successfully', 'Success!');
        },
        error: (err) => {
          console.log(err);
        },
      })
    }
  }

  DateCheck(date: any) {
    this.GivenDate = date.value
    this.GivenDate = new Date(this.GivenDate);
    if (this.GivenDate > this.CurrentDate) {
      console.log(date.value);
      this.f.joinDate.reset()
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
