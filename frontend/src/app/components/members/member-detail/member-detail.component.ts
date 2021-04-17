import { Component, OnInit, ViewChild } from '@angular/core';
import { Member } from 'src/app/_models/members';
import { MembersService } from 'src/app/services/members.service';
import { ActivatedRoute } from '@angular/router';
import { TabsetComponent, TabDirective } from 'ngx-bootstrap/tabs';
import { Message } from 'src/app/_models/message';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.scss']
})
export class MemberDetailComponent implements OnInit {
  //@ViewChild('memberTabs') memberTabs: TabsetComponent;
  activeTab: TabDirective;
  member:Member;
  //messages: Message[] =[];

  constructor(private messageService: MessageService, private memberService: MembersService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember() {
    this.memberService.getMember(this.route.snapshot.paramMap.get('username')).subscribe(member => {
      this.member = member;
    })
  }

  public typeName() {
    if (this.member.userType === "SystemAdmin") {
      return "System Admin";
    } else {
      return this.member.userType;
    }
  }

  // loadMessages() {
  //   this.messageService.getMessageThread(this.member.username).subscribe(messages => {
  //     this.messages = messages;
  //   })
  // }

  // onTabActivated(data: TabDirective) {
  //   this.activeTab = data;
  //   if (this.activeTab.heading === 'Messages' && this.messages.length === 0) {
  //     this.loadMessages();
  //   }
  // }

}
