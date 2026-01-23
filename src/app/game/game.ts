import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { GameModel } from '../../models/game';

@Component({
  selector: 'app-game',
  imports: [CommonModule],
  templateUrl: './game.html',
  styleUrl: './game.scss',
})
export class Game implements OnInit{

  pickCardAnimation = false;
  game?: GameModel;

  newGame(){
    this.game = new GameModel();
    console.log(this.game)
  }

  ngOnInit(): void {
    this.newGame();
  }

  takeCard(){
    this.pickCardAnimation = true;
  }

}
