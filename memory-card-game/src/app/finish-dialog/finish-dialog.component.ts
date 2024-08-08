import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-finish-dialog',
  templateUrl: './finish-dialog.component.html',
  styleUrls: ['./finish-dialog.component.css']
})
export class FinishDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<FinishDialogComponent>) {}

  ngOnInit(): void {}

  playAgain(): void {
    this.dialogRef.close(true);
  }

}