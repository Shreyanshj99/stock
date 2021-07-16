import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FusionchComponent } from './fusionch.component';

describe('FusionchComponent', () => {
  let component: FusionchComponent;
  let fixture: ComponentFixture<FusionchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FusionchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FusionchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
