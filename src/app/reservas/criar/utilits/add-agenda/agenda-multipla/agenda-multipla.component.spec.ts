import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendaMultiplaComponent } from './agenda-multipla.component';

describe('AgendaMultiplaComponent', () => {
  let component: AgendaMultiplaComponent;
  let fixture: ComponentFixture<AgendaMultiplaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgendaMultiplaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgendaMultiplaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
