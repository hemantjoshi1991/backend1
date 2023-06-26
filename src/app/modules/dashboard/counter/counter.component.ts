import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css'],
  animations: [
    trigger('count', [
      transition(':increment', [
        style({ opacity: 0 }),
        animate('1s', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class CounterComponent implements OnInit, OnChanges {
  @Input() startValue: number;
  @Input() endValue: number;
  currentCount: number;

  ngOnInit() {
    this.currentCount = this.startValue;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['startValue'] && changes['endValue']) {
      this.animateCount();
    }
  }

  private animateCount() {
    let counter = this.startValue;
    const increment = Math.ceil((this.endValue - this.startValue) / 50);
    const duration = 1000; // Animation duration in milliseconds
    const delay = duration / (this.endValue - this.startValue);

    const interval = setInterval(() => {
      counter += increment;
      this.currentCount = counter;

      if (counter >= this.endValue) {
        this.currentCount = this.endValue;
        clearInterval(interval);
      }
    }, delay);
  }
}