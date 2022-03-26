import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ListService } from './list.service';
import { ListData } from './list.types';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  public data$: Observable<ListData> = this.listService.data$;
  public newTodoName: string = '';

  constructor(private listService: ListService) {}

  public ngOnInit(): void {
    this.listService.getToDos();
  }

  public addTodo(): void {
    if (!this.newTodoName.length) {
      return;
    }

    this.listService.postToDo(false, this.newTodoName);

    this.newTodoName = '';
  }

  public onValueChange(event: any): void {
    this.newTodoName = event?.target.value;
  }

  public onRemoveTodo(index: number): void {
    console.log(`remove todo`);
    // this.todoList.splice(index, 1);
  }
}
