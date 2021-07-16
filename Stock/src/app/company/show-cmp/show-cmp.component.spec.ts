import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCmpComponent } from './show-cmp.component';

describe('ShowCmpComponent', () => {
  let component: ShowCmpComponent;
  let fixture: ComponentFixture<ShowCmpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowCmpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowCmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
