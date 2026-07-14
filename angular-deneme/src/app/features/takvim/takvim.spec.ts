import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Takvim } from './takvim';

describe('Takvim', () => {
  let component: Takvim;
  let fixture: ComponentFixture<Takvim>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Takvim],
    }).compileComponents();

    fixture = TestBed.createComponent(Takvim);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
