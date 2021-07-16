import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditCmpComponent } from './add-edit-cmp.component';

describe('AddEditCmpComponent', () => {
  let component: AddEditCmpComponent;
  let fixture: ComponentFixture<AddEditCmpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditCmpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditCmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
