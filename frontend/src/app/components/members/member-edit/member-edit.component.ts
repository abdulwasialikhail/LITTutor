import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/_models/members';
import { User } from 'src/app/_models/user';
import { AccountsService } from 'src/app/services/accounts.service';
import { take } from 'rxjs/operators';
import { MembersService } from 'src/app/services/members.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.scss']
})
export class MemberEditComponent implements OnInit {
  member: Member;
  user: User;

  constructor(private accountService: AccountsService, private memberService: MembersService, private toaster: ToastrService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
   }

  ngOnInit(): void {
    this.laodMember();
  }

  laodMember() {
    this.memberService.getMember(this.user.userName).subscribe(member => {
      this.member = member;
    })
  }
updateDetails() {
  this.toaster.info("Not Yet Implemented");
}
}
