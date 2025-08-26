import {Component, inject, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {TasksService} from "../tasks.service";

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  enteredTitle = signal<string>('');
  enteredDescription = signal<string>('');
  private tasksService = inject(TasksService);

  onAddTask(form: HTMLFormElement) {
    this.tasksService.addTask({
      title: this.enteredTitle(),
      description: this.enteredDescription()
    })
    form.reset();
  }
}
