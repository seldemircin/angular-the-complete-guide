import {CanMatchFn, RedirectCommand, Router, Routes} from "@angular/router";
import {NoTaskComponent} from "./tasks/no-task/no-task.component";
import {resolvePageTitle, resolveUser, UserTasksComponent} from "./users/user-tasks/user-tasks.component";
import {inject} from "@angular/core";

const dummyCanMatch: CanMatchFn = (route, segments) => {
  const router = inject(Router);

  const randomNumber = Math.random();
  if (randomNumber < 0.5) {
    return true;
  }

  return new RedirectCommand(router.parseUrl('/unauthorized'))
}

export const routes: Routes = [
  {
    path: '',
    component: NoTaskComponent
  },
  {
    path: 'users/:userId',
    component: UserTasksComponent,
    loadChildren: async () => {
      const mod = await import('./users/users.routes');
      return mod.usersRoutes;
    },
    //canMatch: [dummyCanMatch], // Route guard to control access to the route
    data: {
      message: 'Hello from user tasks route' // Static data passed to the route
    },
    resolve: {
      user: resolveUser // Dynamic data resolved before activating the route. This user property will be available in the component.
    },
    title: resolvePageTitle
  },
  {
    path: '**', // 404 route
    loadComponent: async () => {
      const mod = await import('./not-found/not-found.component');
      return mod.NotFoundComponent;
    }
  }
]

