import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AccountsService } from 'src/app/services/accounts.service';

@Component({
  selector: 'app-add-tutor',
  templateUrl: './add-tutor.component.html',
  styleUrls: ['./add-tutor.component.scss']
})
export class AddTutorComponent implements OnInit {
  registerForm: FormGroup;
  validationErrors: string [];

  constructor(private toastr: ToastrService, private router: Router, 
    private fb: FormBuilder, private accountSerive: AccountsService) { }

  ngOnInit(): void {
    this.initializeForm();

  }

  initializeForm() {
    this.registerForm = this.fb.group ({
      gender: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      studentId: ['N/A'],
      campus: ['', Validators.required],
      course: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['' , Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', [Validators.required, Validators.maxLength(8), Validators.minLength(4)]],
      confirmPassword:['', [Validators.required, this.matchValues('password')]]
    });
  }

  matchValues(matchTo: string): ValidatorFn{
    return (control: AbstractControl) => {
      return control?.value === control?.parent?.controls[matchTo].value
      ? null : {isMatching: true}
    }
  }

  register(): void {
    this.registerForm.markAllAsTouched();
    if(this.registerForm.valid) {
      this.accountSerive.addTutor(this.registerForm.value).subscribe(response => {
        this.router.navigateByUrl("/home");
        this.toastr.success("Tutor Added Successfully!");
      });
    } else this.toastr.error("Fill The Required Fields");

    // this.router.navigate(['/home/welcome']);
    // this.toastr.success("New User Added!");
  }

}
