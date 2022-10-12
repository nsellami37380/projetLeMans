import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCarComponent } from './form-car.component';

describe('FormCarComponent', () => {
  let component: FormCarComponent;
  let fixture: ComponentFixture<FormCarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormCarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
