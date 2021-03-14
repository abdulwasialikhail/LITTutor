import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { Member } from 'src/app/_models/members';
import { ToastrService } from 'ngx-toastr';
import { MembersService } from 'src/app/services/members.service';
import { AccountsService } from 'src/app/services/accounts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-application',
  templateUrl: './create-application.component.html',
  styleUrls: ['./create-application.component.scss']
})
export class CreateApplicationComponent implements OnInit {
  applicationForm: FormGroup;
  validationErrors: string [];
  members$: Observable<Member []>;

  constructor(private toastr: ToastrService, private router: Router, 
    private fb: FormBuilder, public accountService: AccountsService,
    private memberService: MembersService) { }

  ngOnInit(): void {
    //this.cdRef.detectChanges();
  //  this.members$ = this.memberService.getMembers();
    this.initializeForm();
  }

  initializeForm() {
    this.applicationForm = this.fb.group ({
      issue: ['', Validators.required],
      course: ['', Validators.required],
      userName: ['', Validators.required]
    });
  }

  application(): void {
    this.applicationForm.markAllAsTouched();
    if(this.applicationForm.valid) {
      this.accountService.createApplication(this.applicationForm.value).subscribe(response => {
        this.router.navigateByUrl("/home");
        this.toastr.success("Application Submitted Successfully!");
      });
    } else this.toastr.error("Fill The Required Fields");
  }

}
