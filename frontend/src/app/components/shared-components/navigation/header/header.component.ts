import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AccountsService } from 'src/app/services/accounts.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() public sidenavToggle = new EventEmitter();
  model: any = {};

  constructor(public accountService: AccountsService) { }

  ngOnInit(): void {
    
  }

  public onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  login() {
    this.accountService.login(this.model).subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    })
  }

  logout() {
    this.accountService.logout();
  }

}
