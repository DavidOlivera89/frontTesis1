import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdopChartComponent } from './pdop-chart.component';

describe('PdopChartComponent', () => {
  let component: PdopChartComponent;
  let fixture: ComponentFixture<PdopChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PdopChartComponent]
    });
    fixture = TestBed.createComponent(PdopChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
