import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostFinderComponent } from './cost-finder.component';

describe('CostFinderComponent', () => {
  let component: CostFinderComponent;
  let fixture: ComponentFixture<CostFinderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CostFinderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CostFinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
