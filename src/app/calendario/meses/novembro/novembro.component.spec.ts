import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovembroComponent } from './novembro.component';

describe('NovembroComponent', () => {
  let component: NovembroComponent;
  let fixture: ComponentFixture<NovembroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NovembroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NovembroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
