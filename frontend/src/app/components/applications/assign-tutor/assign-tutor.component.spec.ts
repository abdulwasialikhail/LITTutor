import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignTutorComponent } from './assign-tutor.component';

describe('AssignTutorComponent', () => {
  let component: AssignTutorComponent;
  let fixture: ComponentFixture<AssignTutorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignTutorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignTutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
