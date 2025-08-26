import {Component, DestroyRef, inject, input, OnInit, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {TasksService} from '../tasks.service';
import {ActivatedRoute, CanDeactivateFn, Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent implements OnInit {
  private tasksService = inject(TasksService);
  private activatedRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);

  userId = signal('');
  enteredTitle = signal('');
  enteredSummary = signal('');
  enteredDate = signal('');

  onSubmit() {
    this.tasksService.addTask(
      {
        title: this.enteredTitle(),
        summary: this.enteredSummary(),
        date: this.enteredDate(),
      },
      this.userId()
    );

    this.router.navigate(['/users', this.userId(), 'tasks'], {
      replaceUrl: true
    });
  }

  ngOnInit() {
    const subscription = this.activatedRoute.params.subscribe({
      next: (params) => {
        this.userId.set(params['userId']);
      }
    })

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}

export const canLeaveEditPage: CanDeactivateFn<NewTaskComponent> = (component) => {
  if (component.enteredTitle() || component.enteredSummary() || component.enteredDate()) {
    if (component.enteredTitle() && component.enteredSummary() && component.enteredDate()) {
      return true;
    }
    return window.confirm('You have unsaved changes. Do you really want to leave?');
  } else {
    return true;
  }
}
