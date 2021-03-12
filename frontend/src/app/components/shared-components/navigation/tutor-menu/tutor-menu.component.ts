import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-tutor-menu',
  templateUrl: './tutor-menu.component.html',
  styleUrls: ['./tutor-menu.component.scss']
})
export class TutorMenuComponent implements OnInit {

  @Output() sidenavClose = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }
  public onSidenavClose() {
    this.sidenavClose.emit();
  }
}
