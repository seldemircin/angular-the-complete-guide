import {afterNextRender, Component, DestroyRef, inject, viewChild} from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";
import {debounceTime} from "rxjs";

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [
    FormsModule
  ]
})
export class LoginComponent {

  private destroyRef = inject(DestroyRef);
  private form = viewChild<NgForm>('form');

  constructor() {
    afterNextRender(() => {
      const email = localStorage.getItem('saved-login-form');

      if (email) {
        const savedData: { email: string } = JSON.parse(email);
        if (savedData && savedData.email) {
          setTimeout(() => {
            this.form()?.setValue({email: savedData.email, password: ''});
          })
        }
      }

      const subscription = this.form()?.valueChanges?.pipe(debounceTime(500)).subscribe({
        next: value => localStorage.setItem('saved-login-form', JSON.stringify({email: value.email})),
      });

      this.destroyRef.onDestroy(() => {
        subscription?.unsubscribe();
      })
    })

  }

  onSubmit(formData: NgForm) {
    if (formData.form.invalid) {
      return;
    }

    const enteredEmail = formData.form.value.email;
    const enteredPassword = formData.form.value.password;

    console.log('Email:', enteredEmail);
    console.log('Password:', enteredPassword);

    formData.form.reset();
  }
}
