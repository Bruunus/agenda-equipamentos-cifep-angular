import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DadosDoUsuarioComponent } from './dados-do-usuario.component';

describe('DadosDoUsuarioComponent', () => {
  let component: DadosDoUsuarioComponent;
  let fixture: ComponentFixture<DadosDoUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DadosDoUsuarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DadosDoUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
