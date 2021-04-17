import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/_models/members';
import { MembersService } from 'src/app/services/members.service';
import { Observable } from 'rxjs';
import { AccountsService } from 'src/app/services/accounts.service';
import { Pagination } from 'src/app/_models/pagination';
import { PageEvent } from '@angular/material/paginator';
import { UserParams } from 'src/app/_models/UserParams';
import { Application } from 'src/app/_models/application';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent implements OnInit {
  members: Member[];
  pagination: Pagination;
  userParams: UserParams;
  applications$: Observable<Application[]>;

  constructor(public memberService: MembersService, public accountService: AccountsService) {
    this.userParams = new UserParams();
   }

  ngOnInit(): void {
    this.loadMember();
    this.applications$ = this.memberService.getApplications();
  }

  loadMember() {
    this.memberService.getMembersPaginated(this.userParams).subscribe(response => {
      this.members = response.result;
      this.pagination = response.pagination;
    })
  }

  pageChanged(pageEvent: PageEvent) {
    this.userParams.pageSize = pageEvent.pageSize;
    this.userParams.pageNumber = pageEvent.pageIndex +1;
    this.loadMember();
  }

}
