import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JaneiroComponent } from './janeiro.component';

describe('JaneiroComponent', () => {
  let component: JaneiroComponent;
  let fixture: ComponentFixture<JaneiroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JaneiroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JaneiroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
