import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPilotComponent } from './form-pilot.component';

describe('FormPilotComponent', () => {
  let component: FormPilotComponent;
  let fixture: ComponentFixture<FormPilotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormPilotComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormPilotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
