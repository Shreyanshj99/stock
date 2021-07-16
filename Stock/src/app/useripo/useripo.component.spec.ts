import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UseripoComponent } from './useripo.component';

describe('UseripoComponent', () => {
  let component: UseripoComponent;
  let fixture: ComponentFixture<UseripoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UseripoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UseripoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
