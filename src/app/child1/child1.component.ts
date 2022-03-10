import { Component, OnInit } from '@angular/core';
import {
  catchError,
  delayWhen,
  finalize,
  Observable,
  of,
  retry,
  retryWhen,
  tap,
  throwError,
  timer,
} from 'rxjs';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-child1',
  templateUrl: './child1.component.html',
  styleUrls: ['./child1.component.scss'],
})
export class Child1Component implements OnInit {
  // public data!: any;
  public data$!: Observable<any>;
  // private form!: any;
  constructor(private sharedService: SharedService) {}

  ngOnInit(): void {
    try {
      this.data$ = this.sharedService
        .getData()
        // .pipe(catchError(() => of('Http call failed')))
        .pipe(
          // catchError((err) => {
          //   console.log('rethrowing error', err);
          //   return throwError(() => new Error(err.message));
          // }),
          // finalize(() => {
          //   console.log('finally block 1');
          // }),
          retry({ count: 2, delay: 2000 }),
          catchError((err) => {
            console.log('caught rethrown error', err);
            return of('Http call failed');
          }),
          finalize(() => {
            console.log('finally block 2');
          })
        );
      // .subscribe({
      //   next: (data) => {
      //     console.log(data);
      //     this.data = data;
      //   },
      //   error: (err) => console.log('error occured in observable', err),
      // });
      // const test = 'test';
      // this.form[test]();
    } catch (err) {
      console.log('error occured', err);
    }
  }
}
