import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddPlayer } from './dialog-add-player';

describe('DialogAddPlayer', () => {
  let component: DialogAddPlayer;
  let fixture: ComponentFixture<DialogAddPlayer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogAddPlayer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogAddPlayer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
