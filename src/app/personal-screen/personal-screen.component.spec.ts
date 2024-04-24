import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalScreenComponent } from './personal-screen.component';

describe('PersonalScreenComponent', () => {
  let component: PersonalScreenComponent;
  let fixture: ComponentFixture<PersonalScreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PersonalScreenComponent]
    });
    fixture = TestBed.createComponent(PersonalScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
