import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, filter, map, Observable, take } from 'rxjs';
import { GetReponseModel } from './request.types';
import { Todo } from './todo/todo.types';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  public variable: string = '123';
  public itemName: string = '';
  private defaultUrl = 'https://jsonplaceholder.typicode.com/todos';

  private header = new HttpHeaders();
  constructor(private httpClient: HttpClient) {}

  public getRequest(url: string = this.defaultUrl): Observable<Todo[]> {
    const params = new HttpParams()
      .append('fiiPractic', true)
      .append('trainingIndex', 2);
    return this.httpClient
      .get<GetReponseModel[]>(url, {
        params: params,
        headers: this.header,
      })
      .pipe(
        take(1),
        delay(1000),
        // filter((response) => {
        //   if (response.length === 200) {
        //     return true;
        //   } else {
        //     return false;
        //   }
        // }),
        map((response: GetReponseModel[]) => {
          return response.map((responseItem) => {
            return {
              text: responseItem.title,
              checked: responseItem.completed,
              userID: responseItem.userId,
            };
          });
        }),
        map((response: Todo[]) => {
          return response.filter((_, index) => {
            if (index < 15) {
              return true;
            }

            return false;
          });
        })
      );
  }

  public getByIdRequest(id: number): Observable<Todo> {
    return this.httpClient
      .get<GetReponseModel>(this.defaultUrl + '/' + id)
      .pipe(
        take(1),
        map((response: GetReponseModel) => {
          return {
            text: response.title,
            checked: response.completed,
            userID: response.userId,
          };
        })
      );
  }

  public postRequest(
    todoObject: Todo,
    url: string = this.defaultUrl
  ): Observable<any> {
    return this.httpClient.post(url, todoObject);
  }
}
