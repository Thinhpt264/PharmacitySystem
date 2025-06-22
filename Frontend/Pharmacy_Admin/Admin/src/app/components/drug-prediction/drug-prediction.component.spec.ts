import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugPredictionComponent } from './drug-prediction.component';

describe('DrugPredictionComponent', () => {
  let component: DrugPredictionComponent;
  let fixture: ComponentFixture<DrugPredictionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DrugPredictionComponent]
    });
    fixture = TestBed.createComponent(DrugPredictionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
