import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApihttpService } from 'src/app/SharedService/apihttp.service';
import { ApiurllinksService } from 'src/app/SharedService/apiurllinks.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-department',
  templateUrl: './edit-department.component.html',
  styleUrls: ['./edit-department.component.scss']
})
export class EditDepartmentComponent implements OnInit {


  issubmitted: boolean = false

  EditDepartmentForm!: FormGroup;


  constructor(private fb: FormBuilder, private router: Router, private restapiSer: ApihttpService,
    private apiUrlSer: ApiurllinksService, private route: ActivatedRoute,private toastrService: ToastrService) {

  }

  ngOnInit(): void {

    this.route.queryParams.subscribe((params) => {

      this.restapiSer.get(this.apiUrlSer.DepartmentGetById + params.dpid).subscribe({
        next: (value) => {
          console.log(value);

          this.EditDepartmentForm.controls['departmentId'].setValue(value.departmentId);
          this.EditDepartmentForm.controls['name'].setValue(value.name);
          
        },
      })

    });


    this.EditDepartmentForm = this.fb.group({
      departmentId: [''],
      name: ['', Validators.required],
      isActive: [true, Validators.required]
    })

  }

  // form validation
  get f() {
    return this.EditDepartmentForm.controls;
  }

  //Department from Submit

  OnSubmit() {
    this.issubmitted = true
    if (this.EditDepartmentForm.valid) {
      console.log(this.EditDepartmentForm.value);
      this.restapiSer.put(this.apiUrlSer.DepartmentUpdate, this.EditDepartmentForm.value).subscribe({
        next: (value) => {
          this.toastrService.success('Update department successfully', 'Success!');
          console.log(value);
          this.router.navigate(['/viewpage'])
        },
        error: (err) => {
          if (err.error.status == 400) {
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

