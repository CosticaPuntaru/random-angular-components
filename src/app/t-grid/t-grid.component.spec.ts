import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TGridComponent } from './t-grid.component';

describe('TGridComponent', () => {
  let component: TGridComponent;
  let fixture: ComponentFixture<TGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
