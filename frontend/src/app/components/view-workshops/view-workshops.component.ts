import { Component, OnInit } from '@angular/core';
import { AccountsService } from 'src/app/services/accounts.service';

@Component({
  selector: 'app-view-workshops',
  templateUrl: './view-workshops.component.html',
  styleUrls: ['./view-workshops.component.scss']
})
export class ViewWorkshopsComponent implements OnInit {

  constructor( public accountService: AccountsService) { }

  ngOnInit(): void {
  }

}
