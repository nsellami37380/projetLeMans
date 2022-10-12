import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageFormComponent } from './page-form.component';

describe('PageFormComponent', () => {
  let component: PageFormComponent;
  let fixture: ComponentFixture<PageFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
