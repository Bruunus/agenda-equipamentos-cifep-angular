import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiplaComponent } from './multipla.component';

describe('MultiplaComponent', () => {
  let component: MultiplaComponent;
  let fixture: ComponentFixture<MultiplaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiplaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultiplaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
