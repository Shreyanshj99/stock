import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowIPOComponent } from './show-ipo.component';

describe('ShowIPOComponent', () => {
  let component: ShowIPOComponent;
  let fixture: ComponentFixture<ShowIPOComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowIPOComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowIPOComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
