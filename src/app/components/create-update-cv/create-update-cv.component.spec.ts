import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateCvComponent } from './create-update-cv.component';

describe('CreateUpdateCvComponent', () => {
  let component: CreateUpdateCvComponent;
  let fixture: ComponentFixture<CreateUpdateCvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUpdateCvComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateUpdateCvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
