import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaxPrepTimeComponent } from './max-prep-time.component';

describe('MaxPrepTimeComponent', () => {
  let component: MaxPrepTimeComponent;
  let fixture: ComponentFixture<MaxPrepTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaxPrepTimeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaxPrepTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
