import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomResultSComponent } from './room-result-s.component';

describe('RoomResultSComponent', () => {
  let component: RoomResultSComponent;
  let fixture: ComponentFixture<RoomResultSComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomResultSComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomResultSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
