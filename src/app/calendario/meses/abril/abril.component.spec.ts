import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbrilComponent } from './abril.component';

describe('AbrilComponent', () => {
  let component: AbrilComponent;
  let fixture: ComponentFixture<AbrilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbrilComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbrilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
