import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApihttpService } from 'src/app/SharedService/apihttp.service';
import { ApiurllinksService } from 'src/app/SharedService/apiurllinks.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.scss']
})
export class AddDepartmentComponent implements OnInit {


  issubmitted: boolean = false

  DepartmentForm!: FormGroup;


  constructor(private fb: FormBuilder, private router: Router, private restapiSer: ApihttpService,
    private apiUrlSer: ApiurllinksService,private toastrService: ToastrService) {

  }

  ngOnInit(): void {

    this.DepartmentForm = this.fb.group({
      name: ['', Validators.required],
      isActive: [true, Validators.required]
    })

  }

  // form validation
  get f() {
    return this.DepartmentForm.controls;
  }

  //Department from Submit

  OnSubmit() {
    this.issubmitted = true
    if (this.DepartmentForm.valid) {
      console.log(this.DepartmentForm.value);
      this.restapiSer.post(this.apiUrlSer.DepartmentCreate, this.DepartmentForm.value).subscribe({
        next: (value) => {
          this.toastrService.success('Add department successfully', 'Success!');
          console.log(value);
          this.router.navigate(['/viewpage'])
        },
        error: (err) => {
          if(err.error.status==400){
            Swal.fire({
              title: 'Error!',
              text: 'Department name already Exists',
              icon: 'error',
              showCancelButton: true,
              cancelButtonColor: '#d33',
            })
          }
          console.log(err.error.status);
        },
      })
    }
  }



}
