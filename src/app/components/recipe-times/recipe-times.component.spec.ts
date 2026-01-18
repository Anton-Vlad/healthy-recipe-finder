import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeTimesComponent } from './recipe-times.component';

describe('RecipeTimesComponent', () => {
  let component: RecipeTimesComponent;
  let fixture: ComponentFixture<RecipeTimesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeTimesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeTimesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
