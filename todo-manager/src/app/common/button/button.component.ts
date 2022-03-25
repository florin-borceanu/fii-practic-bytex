import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() color = '';
  @Input() circle = false;
  @Input() loading = false;
  @Output() click = new EventEmitter();

  public onClick(): void {
    this.click.emit();
  }
}
