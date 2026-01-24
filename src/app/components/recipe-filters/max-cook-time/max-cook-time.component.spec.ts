import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaxCookTimeComponent } from './max-cook-time.component';

describe('MaxCookTimeComponent', () => {
  let component: MaxCookTimeComponent;
  let fixture: ComponentFixture<MaxCookTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaxCookTimeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaxCookTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
