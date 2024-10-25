import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BioDetailsComponent } from './bio-details.component';

describe('BioDetailsComponent', () => {
  let component: BioDetailsComponent;
  let fixture: ComponentFixture<BioDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BioDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BioDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
