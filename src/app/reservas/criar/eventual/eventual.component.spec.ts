import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventualComponent } from './eventual.component';

describe('EventualComponent', () => {
  let component: EventualComponent;
  let fixture: ComponentFixture<EventualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventualComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
