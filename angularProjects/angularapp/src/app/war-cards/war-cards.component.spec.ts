import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WarCardsComponent } from './war-cards.component';

describe('WarCardsComponent', () => {
  let component: WarCardsComponent;
  let fixture: ComponentFixture<WarCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
