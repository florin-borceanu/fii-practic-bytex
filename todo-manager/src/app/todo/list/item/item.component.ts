import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { Todo } from '../../todo.types';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnDestroy {
  @Input() item?: Todo;
  @Output() todoChanged: EventEmitter<void> = new EventEmitter<void>();

  ngOnDestroy(): void {
    console.log('component destroyed');
  }

  public onValueChange(event: Event): void {
    // console.log(event)
    this.todoChanged.emit();
  }
}
