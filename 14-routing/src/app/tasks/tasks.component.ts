import {Component, computed, DestroyRef, inject, input, OnInit, signal} from '@angular/core';

import {TaskComponent} from './task/task.component';
import {TasksService} from "./tasks.service";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {User} from "../users/user/user.model";

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent, RouterLink],
})
export class TasksComponent implements OnInit {
  private tasksService = inject(TasksService);
  private activatedRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);

  userId = signal<string>('');
  sort = signal<'asc' | 'desc'>('desc');
  user = signal<User>({id: '', name: '', avatar: ''});

  userTasks = computed(() => {
    return this.tasksService.allTasks().filter((task) => task.userId === this.userId()).sort((a, b) => {
      if (this.sort() === 'asc') {
        return a.id > b.id ? 1 : -1;
      } else {
        return a.id > b.id ? -1 : 1;
      }
    });
  })

  ngOnInit() {
    const subcription1 = this.activatedRoute.data.subscribe({
      next: (data) => {
        this.user.set(data['user']);
      }
    })

    const subscription2 = this.activatedRoute.queryParams.subscribe({
      next: (queryParams) => {
        this.sort.set(queryParams['sort']);
      }
    })

    const subscription3 = this.activatedRoute.params.subscribe({
      next: (params) => {
        this.userId.set(params['userId']);
      }
    })

    this.destroyRef.onDestroy(() => {
      subcription1.unsubscribe();
      subscription2.unsubscribe();
      subscription3.unsubscribe();
    });
  }
}
