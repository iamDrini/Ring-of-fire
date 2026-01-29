import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerMobile } from './player-mobile';

describe('PlayerMobile', () => {
  let component: PlayerMobile;
  let fixture: ComponentFixture<PlayerMobile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerMobile]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayerMobile);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
