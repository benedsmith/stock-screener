import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartFactoryComponent } from './chart-factory.component';

describe('ChartFactoryComponent', () => {
  let component: ChartFactoryComponent;
  let fixture: ComponentFixture<ChartFactoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartFactoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartFactoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
