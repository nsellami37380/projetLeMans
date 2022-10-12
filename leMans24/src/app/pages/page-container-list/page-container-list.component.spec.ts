import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageContainerListComponent } from './page-container-list.component';

describe('PageContainerListComponent', () => {
  let component: PageContainerListComponent;
  let fixture: ComponentFixture<PageContainerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageContainerListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageContainerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
