import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';




@Component({
  selector: 'app-dialog-add-player',
  imports: [MatDialogModule,
     MatFormFieldModule,
     MatInputModule,
     FormsModule,
     MatButtonModule],
  templateUrl: './dialog-add-player.html',
  styleUrl: './dialog-add-player.scss',
})
export class DialogAddPlayer {
  name: string = '';
  
   constructor(private dialogRef: MatDialogRef<DialogAddPlayer>){

   }

   onNoClick():void{
    this.dialogRef.close();
   }

   animal(){

   }
}
