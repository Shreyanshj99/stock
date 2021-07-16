import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditIpoComponent } from './add-edit-ipo.component';

describe('AddEditIpoComponent', () => {
  let component: AddEditIpoComponent;
  let fixture: ComponentFixture<AddEditIpoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditIpoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditIpoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
