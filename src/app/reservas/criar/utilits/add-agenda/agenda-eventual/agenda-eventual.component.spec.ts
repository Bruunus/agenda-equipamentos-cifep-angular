import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendaEventualComponent } from './agenda-eventual.component';

describe('AgendaEventualComponent', () => {
  let component: AgendaEventualComponent;
  let fixture: ComponentFixture<AgendaEventualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgendaEventualComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgendaEventualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
