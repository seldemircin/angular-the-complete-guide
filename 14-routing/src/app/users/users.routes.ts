import {Routes} from "@angular/router";
import {canLeaveEditPage, NewTaskComponent} from "../tasks/new-task/new-task.component";
import {TasksComponent} from "../tasks/tasks.component";

// users/:userId yönlendirmesi altındaki child route'lar.
export const usersRoutes: Routes = [
  {
    path: '',
    redirectTo: 'tasks',
    pathMatch: 'full'
  },
  {
    path: 'tasks',
    component: TasksComponent
  },
  {
    path: 'tasks/new',
    component: NewTaskComponent,
    canDeactivate: [canLeaveEditPage] //
  }
]
