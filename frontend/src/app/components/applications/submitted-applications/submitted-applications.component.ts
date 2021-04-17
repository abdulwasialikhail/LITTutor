import { Component, OnInit, ViewChild } from '@angular/core';
import { AccountsService } from 'src/app/services/accounts.service';
import { MembersService } from 'src/app/services/members.service';
import { Member } from 'src/app/_models/members';
import { Observable } from 'rxjs';
import { Application } from 'src/app/_models/application';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup, NgForm } from '@angular/forms';

@Component({
  selector: 'app-submitted-applications',
  templateUrl: './submitted-applications.component.html',
  styleUrls: ['./submitted-applications.component.scss']
})
export class SubmittedApplicationsComponent implements OnInit {
  @ViewChild('approvalForm') approvalForm: NgForm;
  //members$: Observable<Member[]>;
  //applications$: Observable<Application[]>;
  applicationss: Application[];
  checkStatus: number;
  status: Member[];
  //arraySize: [];
  applicationForm: FormGroup;
  //model: any;
  myError: boolean = true;
  bb: number = 0;
  //model: any = {};
  //email = "aoife@gmail.com";

  constructor(private toastr: ToastrService, private router: Router,
    private fb: FormBuilder, public accountService: AccountsService, private memberService: MembersService) { }

  ngOnInit(): void {
    //this.members$ = this.memberService.getMembers();
    //this.applications$ = this.memberService.getApplications();

    this.loadApplications();
    this.loadMembers();
    //this.initializeForm();
    console.log(this.bb);
  }

  // applicationUrl(id: number) {
  //   return `/home/applications/${id}`;
  // }

  // initializeForm() {
  //   this.applicationForm = this.fb.group({
  //     issue: ['', Validators.required],
  //     course: ['', Validators.required],
  //     username: ['', Validators.required],

  //   });
  // }

  public loadApplications() {
    this.memberService.getApplications().subscribe(application => {
      this.applicationss = application;
    })
  }

  loadMembers() {
    this.memberService.getMembers().subscribe(member => {
      this.status = member;
      //console.log(this.status.length);
      this.status.forEach(c => {
        if (c.applicationSubmitted === false && c.userType === "Student") {
          this.bb++;
          this.myError = false;
          console.log(this.bb);
          console.log(this.myError);
        }
      });
    })
  }

}
