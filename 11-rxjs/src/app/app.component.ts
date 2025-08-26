import {Component, DestroyRef, effect, inject, OnInit, signal} from '@angular/core';
import {interval, map, Observable, take} from "rxjs";
import {toObservable, toSignal} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  private destroyRef = inject(DestroyRef);

  clickCount = signal(0);
  clickCount$ = toObservable(this.clickCount);

  interval$ = interval(1000);
  intervalSignal = toSignal(this.interval$, {
    initialValue: 0
  });

  customObservable$ = new Observable((subscriber) => {
    let count = 0;
    const interval = setInterval(() => {
      if (count > 3) {
        clearInterval(interval);
        subscriber.complete();
        return;
      }
      subscriber.next({message: `New value : ${count}`});
      count++;
    }, 2000)
  })

  constructor() {
    /* effect(() => {
      console.log('Clicked button : ' + this.clickCount() + ' times');
    }) */

    /* effect(() => {
      console.log(this.intervalSignal());
    }); */
  }


  ngOnInit() {
    /*
    const subscription = interval(1000).pipe(
      map(val => val * 2),
      take(4)
    )
      .subscribe({
        next: value => console.log(value),
        complete: () => console.log('Completed.')
      });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    })
    */
    const subscription = this.clickCount$.subscribe({
      next: value => console.log(value),
    })

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    })

    this.customObservable$.subscribe({
      next: value => console.log(value),
      complete: () => console.log('Completed!')
    })
  }

  onClick() {
    this.clickCount.update(prevCount => prevCount + 1);
  }
}
