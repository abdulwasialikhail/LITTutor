import { Component, OnInit, Input } from '@angular/core';
import { Member } from 'src/app/_models/members';
import { ToastrService } from 'ngx-toastr';
import { AccountsService } from 'src/app/services/accounts.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.scss']
})
export class MemberCardComponent implements OnInit {
  @Input() member: Member;

  constructor(private toastr: ToastrService, public accountService: AccountsService) { }

  ngOnInit(): void {
  }

  notImplemented() {
    this.toastr.info("Not Implemented Yet")
  }

  public typeName() {
    if (this.member.userType === "SystemAdmin") {
      return "System Admin";
    } else {
      return this.member.userType;
    }
  }

}
