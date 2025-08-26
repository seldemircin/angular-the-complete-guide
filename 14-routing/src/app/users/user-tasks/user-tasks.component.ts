import {Component, DestroyRef, inject, input, OnInit, signal} from '@angular/core';
import {UsersService} from "../users.service";
import {ActivatedRoute, ActivatedRouteSnapshot, RouterLink, RouterOutlet} from "@angular/router";
import {User} from "../user/user.model";

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
  imports: [
    RouterOutlet,
    RouterLink
  ]
})
export class UserTasksComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);

  user = signal<User>({id: '', name: '', avatar: ''});

  ngOnInit() {
    const subscription = this.activatedRoute.data.subscribe({
      next: (data) => {
        this.user.set(data['user']);
      }
    })

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}


export const resolveUser = (activatedRoute: ActivatedRouteSnapshot) => {
  const usersService = inject(UsersService);
  const userId = activatedRoute.paramMap.get('userId');
  if (userId) {
    return usersService.getUserById(userId);
  }
  return null;
}

export const resolvePageTitle = (activatedRoute: ActivatedRouteSnapshot) => {
  const user = resolveUser(activatedRoute);
  return user ? `${user.name}'s Tasks` : 'User Tasks';
}
