import { Component, OnInit } from '@angular/core';
import { AccountsService } from 'src/app/services/accounts.service';
import { MembersService } from 'src/app/services/members.service';
import { Member } from 'src/app/_models/members';
import { Observable } from 'rxjs';
import { Application } from 'src/app/_models/application';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-submitted-applications',
  templateUrl: './submitted-applications.component.html',
  styleUrls: ['./submitted-applications.component.scss']
})
export class SubmittedApplicationsComponent implements OnInit {
  members$: Observable<Member []>;
  applications$: Observable<Application []>;
  checkStatus: number;
  status: Member[];
  applicationForm: FormGroup;

  constructor(private toastr: ToastrService, private router: Router, 
    private fb: FormBuilder, public accountService: AccountsService, private memberService: MembersService) { }

  ngOnInit(): void {
    this.members$ = this.memberService.getMembers();
    this.applications$ = this.memberService.getApplications();
    this.initializeForm();
  }

  initializeForm() {
    this.applicationForm = this.fb.group ({
      issue: ['', Validators.required],
      course: ['', Validators.required],
      userName: ['', Validators.required]
    });
  }
  

  applicationStatus() {
  }

  // private applicationStatus() {
  //   for (const st of this.status)
  //     if (st.applicationSubmitted === true) {
  //       this.checkStatus = 1;
  //     } else {
  //       this.checkStatus = 2;
  //     }
  // }


}
