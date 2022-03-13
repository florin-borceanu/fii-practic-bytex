import { Component, OnDestroy, OnInit } from '@angular/core';
import { delay, map, Subscription } from 'rxjs';
import { RequestService } from '../request.service';
import { GetReponseModel } from '../request.types';
import { Todo } from '../todo/todo.types';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit, OnDestroy {
  public getResponse: Todo | undefined = undefined;
  public postResponse: string | Todo = '';
  public loading: boolean = false;
  public subscription = new Subscription();
  private url: string = 'https://jsonplaceholder.typicode.com/todos';

  constructor(private requestService: RequestService) {
    this.requestService.getRequest(this.url).subscribe(
      (response: Todo[]) => {
        this.getResponse = response[0];
      },
      (error) => {
        console.log(error);
      },
      () => {
        console.log('anything happened, i am here');
      }
    );
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }

  public sendPOST(): void {
    if (!this.getResponse) {
      return;
    }

    this.loading = true;
    this.subscription.add(
      this.requestService
        .postRequest(this.getResponse, this.url)
        .pipe(delay(1500))
        .subscribe((response) => {
          this.postResponse = response;
          this.loading = false;
          alert(JSON.stringify(response));
        })
    );
  }
}
