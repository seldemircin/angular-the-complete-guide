import {inject, Injectable, signal} from "@angular/core";
import {Task, TaskStatus} from "./task.model";
import {LoggingService} from "../logging.service";

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private loggingService = inject(LoggingService);
  private tasks = signal<Task[]>([]);
  allTasks = this.tasks.asReadonly();

  addTask(task: { title: string, description: string }) {
    const newTask: Task = {
      ...task,
      id: Math.random().toString(),
      status: 'OPEN'
    };

    this.tasks.update((oldTasks) => [...oldTasks, newTask]);
    this.loggingService.log('ADDED TASK WITH TITLE ' + newTask.title);
  }

  updateTaskStatus(id: string, status: TaskStatus) {
    this.tasks.update((oldTasks) => oldTasks.map((task) => {
      return task.id === id ? {...task, status} : task;
    }))
    this.loggingService.log('CHANGED TASK STATUS TO ' + status);
  }
}
