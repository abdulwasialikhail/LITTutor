import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from 'src/app/_models/members';
import { Application } from 'src/app/_models/application';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AccountsService } from 'src/app/services/accounts.service';
import { MembersService } from 'src/app/services/members.service';

@Component({
  selector: 'app-assign-tutor',
  templateUrl: './assign-tutor.component.html',
  styleUrls: ['./assign-tutor.component.scss']
})
export class AssignTutorComponent implements OnInit {
  members$: Observable<Member[]>;
  applications$: Observable<Application[]>;
  applications: Application[];
  checkStatus: number;
  status: Member[];
  arraySize: [];
  applicationForm: FormGroup;
  //model: any;
  myError: boolean = true;
  bb: number = 0;
  model: any = {};
  email = "aoife@gmail.com";

  constructor(private toastr: ToastrService, private router: Router,
    private fb: FormBuilder, public accountService: AccountsService, private memberService: MembersService) { }

  ngOnInit(): void {
    this.members$ = this.memberService.getMembers();
    this.applications$ = this.memberService.getApplications();
  }

  applicationUrl(id: number) {
    return `/home/applications/${id}`;
  }

  initializeForm() {
    this.applicationForm = this.fb.group({
      issue: ['', Validators.required],
      course: ['', Validators.required],
      username: ['', Validators.required],

    });
  }

  public loadApplications() {
    this.memberService.getApplications().subscribe(application => {
      this.applications = application;
     this.applications.forEach (x => {
       console.log(x.tutorId);
       console.log(x.appUserId);
     })
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
