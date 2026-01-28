import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { GameModel } from '../../models/game';
import { Player } from "../player/player";
import {MatDialog} from '@angular/material/dialog';
import { DialogAddPlayer } from '../dialog-add-player/dialog-add-player';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { GameInfo } from "../game-info/game-info";
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';

export interface DialogData {
  name: string;
}


@Component({
  selector: 'app-game',
  imports: [CommonModule,
    Player,
    MatFormFieldModule, MatInputModule,
    FormsModule,
    MatButtonModule,
    MatIconModule, GameInfo],

  templateUrl: './game.html',
  styleUrl: './game.scss',
})
export class Game implements OnInit {

  firestore: Firestore = inject(Firestore);
  items$: Observable<any[]>;

  pickCardAnimation = false;
  currentCard: string = '';
  game = new GameModel();
  
  constructor(private cdr: ChangeDetectorRef, public dialog: MatDialog){
    const games = collection(this.firestore, 'games');
    this.items$ = collectionData(games);
    
    // Subscribe für direkte Datenverarbeitung
    this.items$.subscribe((game) => {
      console.log('Games collection updated:', game);
      // Hier kannst du die Daten verarbeiten
    });
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

        this.game.currentPlayer++;
        this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
        setTimeout(() => {
          this.game.playedCards.push(this.currentCard);
          this.pickCardAnimation = false;
          this.cdr.detectChanges();
        }, 1000);
      }
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayer);

    dialogRef.afterClosed().subscribe(name => {
      if (name) {
        this.game.players.push(name);
        this.cdr.detectChanges();
      }
    });
  }

}
