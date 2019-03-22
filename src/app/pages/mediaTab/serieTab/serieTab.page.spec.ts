import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SerieTabPage } from './serieTab.page';

describe('SerieTabPage', () => {
  let component: SerieTabPage;
  let fixture: ComponentFixture<SerieTabPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SerieTabPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SerieTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
