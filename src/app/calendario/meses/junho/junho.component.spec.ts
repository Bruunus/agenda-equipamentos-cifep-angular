import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JunhoComponent } from './junho.component';

describe('JunhoComponent', () => {
  let component: JunhoComponent;
  let fixture: ComponentFixture<JunhoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JunhoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JunhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
