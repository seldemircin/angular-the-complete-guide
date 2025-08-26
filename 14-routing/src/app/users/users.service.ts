import {Injectable, signal} from '@angular/core';

import {DUMMY_USERS} from '../../dummy-users';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private users = signal(DUMMY_USERS);
  allUsers = this.users.asReadonly();

  getUserById(id: string) {
    return this.users().find(user => user.id === id);
  }
}
