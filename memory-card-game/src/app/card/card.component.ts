import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() icon: string = '';
  @Input() show: boolean = false;
  @Output() cardClick = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}

  flipCard() {
    if (!this.show) {
      this.cardClick.emit();
    }
  }

}