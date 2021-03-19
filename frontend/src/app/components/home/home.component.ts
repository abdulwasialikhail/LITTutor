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

  constructor(private memberService: MembersService, public accountService: AccountsService, 
    private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {    
    this.loadUser();
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
      this.loadApplication();
    })
  }

  loadApplication() {
    this.memberService.getApplications().subscribe(app => {
      app.forEach(x => {
        if (x.appUserId === this.member.id) {
          this.memberService.getApplication(x.id).subscribe(appl => {
            this.application = appl;
          });
        }
      })
    })
  }
}
