import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetembroComponent } from './setembro.component';

describe('SetembroComponent', () => {
  let component: SetembroComponent;
  let fixture: ComponentFixture<SetembroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetembroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetembroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
