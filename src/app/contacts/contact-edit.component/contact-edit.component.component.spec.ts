import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactEdit.ComponentComponent } from './contact-edit.component.component';

describe('ContactEdit.ComponentComponent', () => {
  let component: ContactEdit.ComponentComponent;
  let fixture: ComponentFixture<ContactEdit.ComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactEdit.ComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactEdit.ComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
