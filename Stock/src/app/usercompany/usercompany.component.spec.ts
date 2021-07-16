import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsercompanyComponent } from './usercompany.component';

describe('UsercompanyComponent', () => {
  let component: UsercompanyComponent;
  let fixture: ComponentFixture<UsercompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsercompanyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsercompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
