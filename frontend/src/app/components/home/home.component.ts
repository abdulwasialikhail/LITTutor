import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/_models/members';
import { Observable } from 'rxjs';
import { MembersService } from 'src/app/services/members.service';
import { AccountsService } from 'src/app/services/accounts.service';
import { Application } from 'src/app/_models/application';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  //members$: Observable<Member []>;
  //applications$: Observable<Application[]>;
  currentUser: User;
  member: Member;
  application: Application;
  Application: Application [];

  constructor(private memberService: MembersService, public accountService: AccountsService, 
    private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {  
      
    this.loadUser();
    this.findApplication();
  }

  loadUser() {
    this.accountService.currentUser$.subscribe(user => {
      this.currentUser = user;
      this.loadMember();
      
    })
  }

  loadMember() {
    this.memberService.getMember(this.currentUser.checkEmail).subscribe(member => {
      this.member = member;
      this.findApplication();
      this.loadApplication();
    })
  }

  // loadApplication() {
  //   this.memberService.getApplications().subscribe(app => {
  //   this.Application = app;
  //   for (let mk of this.Application) {
  //   if (mk.appUserId = this.member.id) {
  //   // this.memberService.getApplication(mk.id).subscribe(appl => {
  //   // this.application = appl;
  //   // })
  //   console.log('kk'+ mk.id);
  //   }
  //   }
  //   app.forEach(x => {
  //   if (x.appUserId === this.member.id) {
  //   this.memberService.getApplication(x.id).subscribe(appl => {
  //   this.application = appl;
  //   console.log(this.application.id);
  //   });
  //   }
  //   })
  //   })
  //   }

  findApplication(){
   var bb = 0;
    this.memberService.getApplications().subscribe(app => {
      app.forEach(x => {
        if (x.appUserId === this.member.id) {
          //console.log(x.id);
          bb = x.id;
        }
      });
    });
    console.log('re'+ bb);
    return bb;
  }

  loadApplication() {
    this.memberService.getApplication(this.member.id).subscribe(app => {
      this.application = app;
      this.findApplication();
    })
  }
}
