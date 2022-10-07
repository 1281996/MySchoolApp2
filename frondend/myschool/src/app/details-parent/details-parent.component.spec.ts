import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsParentComponent } from './details-parent.component';

describe('DetailsParentComponent', () => {
  let component: DetailsParentComponent;
  let fixture: ComponentFixture<DetailsParentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsParentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
