import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, first, map, Observable } from 'rxjs';
import { Todo } from 'src/app/types';
import { ToDosResponse } from './todos.types';

@Injectable({
  providedIn: 'root',
})
export class ToDosService {
  public isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public toDos$: BehaviorSubject<Todo[]> = new BehaviorSubject<Todo[]>([]);

  private get url(): string {
    return 'https://jsonplaceholder.typicode.com/todos';
  }

  constructor(private httpClient: HttpClient) {}

  public get(): void {
    this.isLoading$.next(true);

    this.httpClient
      .get<ToDosResponse[]>(this.url)
      .pipe(
        map((response: ToDosResponse[]) =>
          response.map((toDo) => ({
            checked: toDo.completed,
            text: toDo.title,
            userID: toDo.userId,
          }))
        ),
        first()
      )
      .subscribe((toDos: Todo[]) => {
        this.isLoading$.next(false);
        this.toDos$.next(toDos);
      });
  }

  public getById(id: number): Observable<Todo> {
    return this.httpClient.get<ToDosResponse>(`${this.url}/${id}`).pipe(
      map((toDo: ToDosResponse) => ({
        checked: toDo.completed,
        text: toDo.title,
        userID: toDo.userId,
      }))
    );
  }

  public post(toDo: Todo): void {
    this.isLoading$.next(true);

    this.httpClient.post(this.url, toDo).pipe(first()).subscribe(() => {
      this.isLoading$.next(false);
    });
  }
}
