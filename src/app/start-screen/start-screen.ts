import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start-screen',
  imports: [],
  templateUrl: './start-screen.html',
  styleUrl: './start-screen.scss',
})
export class StartScreen {

  constructor(private router:Router){

  }

  newGame(){
    this.router.navigateByUrl('/game');
  }

}
