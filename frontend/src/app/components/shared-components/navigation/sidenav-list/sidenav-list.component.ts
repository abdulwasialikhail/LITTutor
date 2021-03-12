import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AccountsService } from 'src/app/services/accounts.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit {

  @Output() sidenavClose = new EventEmitter();
  constructor(public accountService: AccountsService) { }

  ngOnInit(): void {
  }
  public onSidenavClose() {
    this.sidenavClose.emit();
  }
}
