import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionarEquipamentoComponent } from './adicionar-equipamento.component';

describe('AdicionarEquipamentoComponent', () => {
  let component: AdicionarEquipamentoComponent;
  let fixture: ComponentFixture<AdicionarEquipamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdicionarEquipamentoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdicionarEquipamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
