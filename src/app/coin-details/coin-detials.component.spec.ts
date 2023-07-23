import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinDetialsComponent } from './coin-detials.component';

describe('CoinDetialsComponent', () => {
  let component: CoinDetialsComponent;
  let fixture: ComponentFixture<CoinDetialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoinDetialsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoinDetialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
