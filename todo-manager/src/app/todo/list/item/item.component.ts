import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from 'src/app/types';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemComponent {
  @Input() public item!: Todo;
  @Output() public checked: EventEmitter<boolean> = new EventEmitter<boolean>();

  public onValueChange(event?: Event): void {
    this.item.checked = !!(
      (event?.target as HTMLInputElement)?.checked ?? !this.item.checked
    );
    this.checked.emit(this.item.checked);
  }
}
