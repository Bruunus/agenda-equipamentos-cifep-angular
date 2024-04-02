import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarChangeComponent } from './editar-change.component';

describe('EditarChangeComponent', () => {
  let component: EditarChangeComponent;
  let fixture: ComponentFixture<EditarChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarChangeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
