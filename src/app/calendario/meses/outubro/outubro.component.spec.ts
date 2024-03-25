import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutubroComponent } from './outubro.component';

describe('OutubroComponent', () => {
  let component: OutubroComponent;
  let fixture: ComponentFixture<OutubroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutubroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutubroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
