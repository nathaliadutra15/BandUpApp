import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplementRegistrationComponent } from './complement-registration.component';

describe('ComplementRegistrationComponent', () => {
  let component: ComplementRegistrationComponent;
  let fixture: ComponentFixture<ComplementRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComplementRegistrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComplementRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
