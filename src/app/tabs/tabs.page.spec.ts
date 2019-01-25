import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieTabPage } from './tabs.page';

describe('TabsPage', () => {
  let component: MovieTabPage;
  let fixture: ComponentFixture<MovieTabPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MovieTabPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
