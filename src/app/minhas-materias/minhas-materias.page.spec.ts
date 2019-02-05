import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MinhasMateriasPage } from './minhas-materias.page';

describe('MinhasMateriasPage', () => {
  let component: MinhasMateriasPage;
  let fixture: ComponentFixture<MinhasMateriasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinhasMateriasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinhasMateriasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
