import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlotConfigurationComponent } from './slot-configuration.component';

describe('SlotConfigurationComponent', () => {
  let component: SlotConfigurationComponent;
  let fixture: ComponentFixture<SlotConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlotConfigurationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlotConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
