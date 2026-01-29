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
import { Firestore, collection, collectionData, addDoc, doc, getDoc, updateDoc, docData } from '@angular/fire/firestore';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { PlayerMobile } from "../player-mobile/player-mobile";

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
    MatIconModule, GameInfo, PlayerMobile],

  templateUrl: './game.html',
  styleUrl: './game.scss',
})
export class Game implements OnInit {

  firestore: Firestore = inject(Firestore);
  items$: Observable<any[]>;
  
  game = new GameModel();
  gameId: string = '';
  
  constructor(private route: ActivatedRoute, private cdr: ChangeDetectorRef, public dialog: MatDialog){
    const games = collection(this.firestore, 'games');
    this.items$ = collectionData(games);
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const gameId = params['id'];
      if (gameId) {
        this.loadGame(gameId);
      }
    });
  }

  async loadGame(gameId: string) {
    this.gameId = gameId;
    const docRef = doc(this.firestore, 'games', gameId);
    
    // Echtzeit-Updates mit docData
    docData(docRef).subscribe((data: any) => {
      if (data) {
        this.game.players = data['players'] || [];
        this.game.stack = data['stack'] || [];
        this.game.playedCards = data['playedCards'] || [];
        this.game.currentPlayer = data['currentPlayer'] || 0;
        this.game.pickCardAnimation = data['pickCardAnimation'] || false;
        this.game.currentCard = data['currentCard'] || '';
        console.log('Game updated in realtime:', data);
        this.cdr.detectChanges();
      } else {
        console.error('Game not found!');
      }
    });
  }

  newGame() {
    this.game = new GameModel();
  }

  takeCard() {
    if (!this.game.pickCardAnimation) {
      const card = this.game.stack.pop();
      if (card) {
        this.game.currentCard = card;
        this.game.pickCardAnimation = true;
        this.game.currentPlayer++;
        this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
        this.updateGame();
        
        setTimeout(() => {
          this.game.playedCards.push(this.game.currentCard);
          this.game.pickCardAnimation = false;
          this.updateGame();
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
        this.updateGame();
      }
    });
  }

  async updateGame() {
    if (this.gameId) {
      try {
        await updateDoc(doc(this.firestore, 'games', this.gameId), this.game.toJson());
        console.log('Game updated in Firestore');
      } catch (error) {
        console.error('Error updating game:', error);
      }
    }
  }

}
