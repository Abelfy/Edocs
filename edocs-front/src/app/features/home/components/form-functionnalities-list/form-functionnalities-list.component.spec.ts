import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFunctionnalitiesListComponent } from './form-functionnalities-list.component';

describe('FormFunctionnalitiesListComponent', () => {
  let component: FormFunctionnalitiesListComponent;
  let fixture: ComponentFixture<FormFunctionnalitiesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormFunctionnalitiesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormFunctionnalitiesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
