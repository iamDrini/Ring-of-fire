import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { GameModel } from '../../models/game';

@Component({
  selector: 'app-start-screen',
  imports: [],
  templateUrl: './start-screen.html',
  styleUrl: './start-screen.scss',
})
export class StartScreen {

  firestore: Firestore = inject(Firestore);

  constructor(private router: Router) {}

  async newGame() {
    const game = new GameModel();
    try {
      const docRef = await addDoc(collection(this.firestore, 'games'), game.toJson());
      this.router.navigateByUrl('/game/' + docRef.id);
    } catch (error) {
      console.error('Error creating game:', error);
    }
  }
}
