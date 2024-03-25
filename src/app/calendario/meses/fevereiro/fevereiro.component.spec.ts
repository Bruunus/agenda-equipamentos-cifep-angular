import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FevereiroComponent } from './fevereiro.component';

describe('FevereiroComponent', () => {
  let component: FevereiroComponent;
  let fixture: ComponentFixture<FevereiroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FevereiroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FevereiroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
