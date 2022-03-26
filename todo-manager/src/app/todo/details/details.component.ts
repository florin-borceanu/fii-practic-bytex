import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToDosService } from 'src/app/services';
import { Todo } from 'src/app/types';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  public localTodo: Todo | undefined;
  private todoList: Todo[] = [];

  constructor(
    private router: ActivatedRoute,
    private requestService: ToDosService
  ) {}

  public ngOnInit(): void {
    const todos = localStorage.getItem('todos');

    this.todoList = todos ? JSON.parse(todos) : [];

    // console.log(this.todoList)
    this.router.params.subscribe((el) => {
      // this.localTodo = this.todoList[(el as any).id];
      console.log('roter param was received');
      this.requestService
        .getById(parseInt((el as any).id as string) + 1)
        .subscribe((todo: Todo) => {
          this.localTodo = todo;
        });
    });
  }
}
