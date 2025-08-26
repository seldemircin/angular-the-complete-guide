import { Component } from '@angular/core';

import { LoginComponent } from './auth/login/login.component';
import {SignupComponent} from "./auth/signup/signup.component";
import {LoginReactiveComponent} from "./auth/login-reactive/login-reactive.component";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [LoginComponent, SignupComponent, LoginReactiveComponent],
})
export class AppComponent {}
