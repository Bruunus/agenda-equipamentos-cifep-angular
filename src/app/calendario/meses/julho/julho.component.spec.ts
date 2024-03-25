import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JulhoComponent } from './julho.component';

describe('JulhoComponent', () => {
  let component: JulhoComponent;
  let fixture: ComponentFixture<JulhoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JulhoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JulhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
