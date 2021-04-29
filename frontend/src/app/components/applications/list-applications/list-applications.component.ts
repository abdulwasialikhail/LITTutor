import { Component, OnInit } from '@angular/core';
import { AccountsService } from 'src/app/services/accounts.service';
import { Observable } from 'rxjs';
import { Member } from 'src/app/_models/members';
import { Application } from 'src/app/_models/application';
import { MembersService } from 'src/app/services/members.service';

@Component({
  selector: 'app-list-applications',
  templateUrl: './list-applications.component.html',
  styleUrls: ['./list-applications.component.scss']
})
export class ListApplicationsComponent implements OnInit {
  members$: Observable<Member[]>;
  applications$: Observable<Application[]>;

  constructor(public accountService: AccountsService, private memberService: MembersService) { }

  ngOnInit(): void {

    this.members$ = this.memberService.getMembers();
    this.applications$ = this.memberService.getApplications();
  }

}
