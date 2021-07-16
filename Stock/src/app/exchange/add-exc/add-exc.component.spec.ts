import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExcComponent } from './add-exc.component';

describe('AddExcComponent', () => {
  let component: AddExcComponent;
  let fixture: ComponentFixture<AddExcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddExcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddExcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
