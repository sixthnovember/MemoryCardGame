import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FinishDialogComponent } from '../finish-dialog/finish-dialog.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  cards: { id: number; icon: string; show: boolean }[] = [];
  previousShownCard: number | null = null;
  icons: string[] = ['🖤', '🐈', '🎸', '📒', '🎮', '🎲', '🌈', '💻'];
  disableClick: boolean = false;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.startGame();
  }

  startGame() {
    const doubledIcons = this.shuffleArray([...this.icons, ...this.icons]);
    this.cards = doubledIcons.map((icon, index) => ({ id: index, icon, show: false }));
    this.previousShownCard = null;
    this.disableClick = false;
  }

  shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  handleCardClick(index: number) {
    if (this.disableClick) {
      return;
    }
    const newCards = [...this.cards];
    if (!newCards[index].show) {
      newCards[index].show = true;
      this.cards = newCards;
      if (this.previousShownCard === null) {
        this.previousShownCard = index;
      } else {
        const previousIcon = this.cards[this.previousShownCard].icon;
        const currentIcon = this.cards[index].icon;
        if (previousIcon !== currentIcon) {
          this.disableClick = true;
          setTimeout(() => {
            newCards[this.previousShownCard!].show = false;
            newCards[index].show = false;
            this.cards = [...newCards];
            this.previousShownCard = null;
            this.disableClick = false;
          }, 1000);
        } else {
          this.previousShownCard = null;
          this.checkForWin();
        }
      }
    }
  }

  checkForWin() {
    if (this.cards.every(card => card.show)) {
      this.showFinishDialog();
    }
  }

  showFinishDialog() {
    const dialogRef = this.dialog.open(FinishDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.startGame();
      }
    });
  }

}