import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { GameModel } from '../../models/game';

@Component({
  selector: 'app-game',
  imports: [CommonModule],
  templateUrl: './game.html',
  styleUrl: './game.scss',
})
export class Game implements OnInit {

  pickCardAnimation = false;
  currentCard: string = '';
  game = new GameModel();
  constructor(private cdr: ChangeDetectorRef){

  }

  ngOnInit(): void {
    this.newGame();
  }

  newGame() {
    this.game = new GameModel();
    console.log(this.game)
  }

  takeCard() {
    if (!this.pickCardAnimation) {
      const card = this.game.stack.pop();
      if (card) {
        this.currentCard = card;
        this.pickCardAnimation = true;
        setTimeout(() => {
          this.game.playedCards.push(this.currentCard);
          this.pickCardAnimation = false;
          this.cdr.detectChanges();
        }, 1000);
      }
    }
  }

}
