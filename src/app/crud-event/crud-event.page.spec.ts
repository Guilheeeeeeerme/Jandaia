import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudEventPage } from './crud-event.page';

describe('CrudEventPage', () => {
  let component: CrudEventPage;
  let fixture: ComponentFixture<CrudEventPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudEventPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudEventPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
