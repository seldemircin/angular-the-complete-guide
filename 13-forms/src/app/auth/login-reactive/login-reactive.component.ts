import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {debounceTime, of} from "rxjs";


const mustContainQuestionMark = (control: AbstractControl) => {
  if (control.value.includes('?')) {
    return null; // Valid
  }
  return {doesNotContainQuestionMark: true}; // Invalid
}

const emailIsUnique = (control: AbstractControl) => {
  if (control.value !== 'text@example.com') {
    return of(null);
  }
  return of({emailIsNotUnique: true});
}

@Component({
  selector: 'app-login-reactive',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-reactive.component.html',
  styleUrl: './login-reactive.component.css'
})
export class LoginReactiveComponent implements OnInit {

  private destroyRef = inject(DestroyRef);

  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
      asyncValidators: [emailIsUnique]
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6), mustContainQuestionMark]
    })
  })

  get emailIsInvalid() {
    return this.form.controls.email.touched && this.form.controls.email.invalid && this.form.controls.email.dirty;
  }

  get passwordIsInvalid() {
    return this.form.controls.password.touched && this.form.controls.password.invalid && this.form.controls.password.dirty;
  }

  ngOnInit() {
    const data = localStorage.getItem('saved-login-data');
    if (data) {
      const parsedData: { email: string } = JSON.parse(data);
      this.form.patchValue({
        email: parsedData.email || ''
      });
    }

    const subscription = this.form.valueChanges.pipe(debounceTime(500)).subscribe({
      next: value => localStorage.setItem('saved-login-data', JSON.stringify({email: value.email}))
    })

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    })
  }

  onSubmit() {
    console.log(this.form);

    const enteredEmail = this.form.value.email;
    const enteredPassword = this.form.value.password;
    console.log(enteredEmail, enteredPassword);
  }
}
