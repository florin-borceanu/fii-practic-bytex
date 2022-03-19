import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/request.service';
import { Todo } from '../todo.types';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  public todoList: Todo[] = [];

  public newTodoName: string = '';

  constructor(private requestService: RequestService) {}

  public ngOnInit(): void {
    //  populare pe baza de local storage
    // const todos = localStorage.getItem('todos');
    // this.todoList = todos ? JSON.parse(todos) : [];
    // ##########
    // populare pe baza de requesturi
    this.requestService.getRequest().subscribe((response: Todo[]) => {
      this.todoList = response;
    });
  }

  public onTodoChanged(item: number): void {
    this.todoList[item].checked = !this.todoList[item].checked;

    this.updateLocalStorage();
  }

  public addNewTodo(): void {
    if (this.newTodoName.length) {
      this.todoList.push({
        text: this.newTodoName,
        checked: false,
      });
      this.newTodoName = '';
    }

    this.updateLocalStorage();

    this.requestService
      .postRequest({
        text: this.newTodoName,
        checked: false,
      })
      .subscribe();
  }

  public onValueChange(event: any): void {
    this.newTodoName = event?.target.value;
  }

  public onRemoveTodo(index: number): void {
    this.todoList.splice(index, 1);

    this.updateLocalStorage();
  }

  private updateLocalStorage(): void {
    localStorage.setItem('todos', JSON.stringify(this.todoList));
  }
}
