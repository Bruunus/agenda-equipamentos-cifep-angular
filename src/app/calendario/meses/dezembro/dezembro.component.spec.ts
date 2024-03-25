import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DezembroComponent } from './dezembro.component';

describe('DezembroComponent', () => {
  let component: DezembroComponent;
  let fixture: ComponentFixture<DezembroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DezembroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DezembroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
