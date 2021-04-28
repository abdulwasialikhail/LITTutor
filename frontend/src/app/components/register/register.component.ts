import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, FormBuilder } from '@angular/forms';
import { AccountsService } from 'src/app/services/accounts.service';
import { Observable } from 'rxjs';
import { Member } from 'src/app/_models/members';
import { MembersService } from 'src/app/services/members.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  validationErrors: string [];
  members$: Observable<Member []>;
  memberService: any;

  constructor(private memberServices: MembersService, private toastr: ToastrService, private router: Router, 
    private fb: FormBuilder, private accountSerive: AccountsService) { }

  ngOnInit(): void {
    this.members$ = this.memberServices.getMembers();
    this.initializeForm();

  }

  initializeForm() {
    this.registerForm = this.fb.group ({
      gender: ['Male'],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      studentId: ['', Validators.required],
      campus: ['', Validators.required],
      course: ['', Validators.required],
      year: ['', Validators.required],
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
      this.accountSerive.register(this.registerForm.value).subscribe(response => {
        this.router.navigateByUrl("/home/welcome");
      });
    } else this.toastr.error("Fill The Required Fields");
    // this.router.navigate(['/home/welcome']);
    // this.toastr.success("New User Added!");
  }

}
