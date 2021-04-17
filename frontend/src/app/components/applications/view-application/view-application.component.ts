import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountsService } from 'src/app/services/accounts.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MembersService } from 'src/app/services/members.service';
import { Application } from 'src/app/_models/application';
import { Observable } from 'rxjs';
import { Member } from 'src/app/_models/members';

@Component({
  selector: 'app-view-application',
  templateUrl: './view-application.component.html',
  styleUrls: ['./view-application.component.scss']
})
export class ViewApplicationComponent implements OnInit {

  application: Application;
  validationErrors: string[];
  applicationForm: FormGroup;
  assignTutorForm: FormGroup;
  members$: Observable<Member[]>;
  selectedValue: string;
  //applications: Application[];

  constructor(private toastr: ToastrService, private router: Router,
    private fb: FormBuilder, public accountService: AccountsService,
    private memberService: MembersService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.members$ = this.memberService.getMembers();
    this.loadApplication();
    this.initializeForm();
    this.assignForm();
  }

  loadApplication() {
    this.memberService.getApplication(+this.route.snapshot.paramMap.get('id')).subscribe(application => {
      this.application = application;
    })
  }

  initializeForm() {
    this.applicationForm = this.fb.group({
      issue: [{ value: '', disabled: true }, Validators.required],
      course: [{ value: '', disabled: true }, Validators.required],
      userName: [{ value: '', disabled: true }, Validators.required],
      name: [{ value: '', disabled: true }]
    });
  }

  assignForm() {
    this.assignTutorForm = this.fb.group({
      //id: [{ value: null, disabled: true }, Validators.required],
      studentEmail: [{ value: '' }, Validators.required],
      tutorEmail: [{ value: '' }, Validators.required]
    });
  }

  approve() {
    this.accountService.approveApplication(this.applicationForm.getRawValue()).subscribe(() => {
      //this.loadApplications();
      this.router.navigateByUrl("/home/applications").then(() => {window.location.reload()});
      this.toastr.success("Application Approved Successfully!");
      //this.memberService.getApplications();

      // TODO: Use the code below to fix reload
      // this.router.navigate(['path/to'])
      //   .then(() => {
      //     window.location.reload();
      //   });
    });
  }
  reject(): void {
    this.accountService.rejectApplication(this.applicationForm.getRawValue()).subscribe(() => {
      //this.loadApplications();
      this.router.navigateByUrl("/home/applications").then(() => {window.location.reload()});
      //this.loadApplications();
      this.toastr.success("Application Rejected Successfully!");
    });
  }

  assign(): void {
    this.accountService.assignTutor(this.assignTutorForm.getRawValue()).subscribe(response => {
      //this.loadApplications();
      this.router.navigateByUrl("/home").then(() => {window.location.reload()});
      this.toastr.success("Tutor Assigend Successfully!");
    });
  }

  // public loadApplications() {
  //   this.memberService.getApplications().subscribe(application => {
  //     this.applications = application;
  //   })
  // }
}
