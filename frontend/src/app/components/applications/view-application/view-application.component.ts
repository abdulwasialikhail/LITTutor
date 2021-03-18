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
  validationErrors: string [];
  applicationForm: FormGroup;
  members$: Observable<Member []>;

  constructor(private toastr: ToastrService, private router: Router, 
    private fb: FormBuilder, public accountService: AccountsService, 
    private memberService: MembersService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.members$ = this.memberService.getMembers();
    this.loadApplication();
    this.initializeForm();
  }

  loadApplication() {
    this.memberService.getApplication(+this.route.snapshot.paramMap.get('id')).subscribe(application => {
      this.application = application;
    })
  }

  initializeForm() {
    this.applicationForm = this.fb.group ({
      issue: ['', Validators.required],
      course: ['', Validators.required],
      userName: ['', Validators.required]
    });
  }

  

  approve(): void {
    this.accountService.approveApplication(this.applicationForm.value).subscribe( response => {
      this.router.navigateByUrl("/home");
      this.toastr.success("Application Approved Successfully!");
    });
  }

  // loadMember() {
  //   this.memberService.getMember(this.route.snapshot.paramMap.get('username')).subscribe(member => {
  //     this.member = member;
  //   })
  // }

  // loadMember() {
  //   this.memberService.getMember(this.route.snapshot.paramMap.get('username')).subscribe(member => {
  //     this.member = member;
  //   })
  // }

}
