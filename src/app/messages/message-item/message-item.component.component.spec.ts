import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageItem.ComponentComponent } from './message-item.component.component';

describe('MessageItem.ComponentComponent', () => {
  let component: MessageItem.ComponentComponent;
  let fixture: ComponentFixture<MessageItem.ComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageItem.ComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageItem.ComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
