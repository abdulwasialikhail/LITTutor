import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutMainAppComponent } from './layout-main-app.component';

describe('LayoutMainAppComponent', () => {
  let component: LayoutMainAppComponent;
  let fixture: ComponentFixture<LayoutMainAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutMainAppComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutMainAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
