import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/_models/members';
import { MembersService } from 'src/app/services/members.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.scss']
})
export class MemberDetailComponent implements OnInit {
  member:Member;

  constructor(private memberService: MembersService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember() {
    this.memberService.getMember(this.route.snapshot.paramMap.get('username')).subscribe(member => {
      this.member = member;
    })
  }

}
