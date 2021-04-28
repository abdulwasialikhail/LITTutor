import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewWorkshopsComponent } from './view-workshops.component';

describe('ViewWorkshopsComponent', () => {
  let component: ViewWorkshopsComponent;
  let fixture: ComponentFixture<ViewWorkshopsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewWorkshopsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewWorkshopsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
