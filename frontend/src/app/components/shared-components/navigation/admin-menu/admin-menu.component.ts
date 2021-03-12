import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.scss']
})
export class AdminMenuComponent implements OnInit {

  @Output() sidenavClose = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  public onSidenavClose() {
    this.sidenavClose.emit();
  }
}
