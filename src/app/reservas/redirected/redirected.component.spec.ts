import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedirectedComponent } from './redirected.component';

describe('TesteComponent', () => {
  let component: RedirectedComponent;
  let fixture: ComponentFixture<RedirectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RedirectedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RedirectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
