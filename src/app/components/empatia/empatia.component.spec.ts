import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpatiaComponent } from './empatia.component';

describe('EmpatiaComponent', () => {
  let component: EmpatiaComponent;
  let fixture: ComponentFixture<EmpatiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpatiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpatiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
