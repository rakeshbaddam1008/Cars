import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarQuestionaireComponent } from './car-questionaire.component';

describe('CarQuestionaireComponent', () => {
  let component: CarQuestionaireComponent;
  let fixture: ComponentFixture<CarQuestionaireComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarQuestionaireComponent]
    });
    fixture = TestBed.createComponent(CarQuestionaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
