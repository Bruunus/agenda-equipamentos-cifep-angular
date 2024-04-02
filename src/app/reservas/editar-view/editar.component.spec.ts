import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarViewComponent } from './editar.component';

describe('EditarComponent', () => {
  let component: EditarViewComponent;
  let fixture: ComponentFixture<EditarViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
