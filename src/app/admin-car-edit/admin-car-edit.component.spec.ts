import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCarEditComponent } from './admin-car-edit.component';

describe('AdminCarEditComponent', () => {
  let component: AdminCarEditComponent;
  let fixture: ComponentFixture<AdminCarEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCarEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCarEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
