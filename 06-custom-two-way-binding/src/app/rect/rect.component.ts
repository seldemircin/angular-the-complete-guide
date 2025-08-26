import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-rect',
  standalone: true,
  imports: [],
  templateUrl: './rect.component.html',
  styleUrl: './rect.component.css',
})
export class RectComponent {
  // Todo: Implement custom two-way binding
  @Input({required: true}) width!: string;
  @Input({required: true}) height!: string;
  @Output() clicked = new EventEmitter<{
    width: string,
    height: string,
  }>();


  onReset() {
    this.clicked.emit({
      width: '100',
      height: '100'
    });
  }
}
