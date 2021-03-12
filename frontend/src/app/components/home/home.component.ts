import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/_models/members';
import { Observable } from 'rxjs';
import { MembersService } from 'src/app/services/members.service';
import { AccountsService } from 'src/app/services/accounts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  members$: Observable<Member []>;

  constructor(private memberService: MembersService, public accountService: AccountsService) { }

  ngOnInit(): void {
    this.members$ = this.memberService.getMembers();
  }

}
