import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-student-menu',
  templateUrl: './student-menu.component.html',
  styleUrls: ['./student-menu.component.scss']
})
export class StudentMenuComponent implements OnInit {
  @Output() sidenavClose = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }
  public onSidenavClose() {
    this.sidenavClose.emit();
  }
}
