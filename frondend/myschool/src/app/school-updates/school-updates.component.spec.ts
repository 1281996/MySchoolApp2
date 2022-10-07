import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolUpdatesComponent } from './school-updates.component';

describe('SchoolUpdatesComponent', () => {
  let component: SchoolUpdatesComponent;
  let fixture: ComponentFixture<SchoolUpdatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchoolUpdatesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchoolUpdatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
