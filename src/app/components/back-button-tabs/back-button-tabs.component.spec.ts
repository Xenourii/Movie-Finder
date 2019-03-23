import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackButtonTabsComponent } from './back-button-tabs.component';

describe('BackButtonTabsComponent', () => {
  let component: BackButtonTabsComponent;
  let fixture: ComponentFixture<BackButtonTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackButtonTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackButtonTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
