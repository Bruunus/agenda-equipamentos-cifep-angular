import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaioComponent } from './maio.component';

describe('MaioComponent', () => {
  let component: MaioComponent;
  let fixture: ComponentFixture<MaioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
