import { Injectable } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';
import { ToDosService } from 'src/app/services';
import { ListData } from './list.types';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  public data$: Observable<ListData> = combineLatest([
    this.toDosService.isLoading$,
    this.toDosService.toDos$,
  ]).pipe(
    map(([isLoading, toDos]) => ({
      isLoading,
      toDos,
    }))
  );

  constructor(private toDosService: ToDosService) {}

  public getToDos(): void {
    this.toDosService.get();
  }

  public postToDo(checked: boolean, text: string): void {
    this.toDosService.post({
      checked,
      text,
    });
  }
}
