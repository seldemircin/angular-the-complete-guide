import {Component} from '@angular/core';
import {AbstractControl, FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";


const equalPasswordsValidator = (control: AbstractControl) => {
  console.log(control)
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;
  return password && confirmPassword && password === confirmPassword ? null : {passwordsNotEqual: true};
}

@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  imports: [
    ReactiveFormsModule
  ]
})
export class SignupComponent {

  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.email, Validators.required]
    }),
    passwords: new FormGroup({
      password: new FormControl('', {
        validators: [Validators.required, Validators.minLength(6)]
      }),
      confirmPassword: new FormControl('', {
        validators: [Validators.required, Validators.minLength(6)]
      })
    }, {
      validators: [equalPasswordsValidator]
    }),
    firstName: new FormControl('', {
      validators: [Validators.required, Validators.maxLength(30)]
    }),
    lastName: new FormControl('', {
      validators: [Validators.required, Validators.maxLength(30)]
    }),
    addresses: new FormGroup({
      street: new FormControl('', {
        validators: [Validators.required, Validators.maxLength(50)]
      }),
      number: new FormControl('', {
        validators: [Validators.required]
      }),
      postalCode: new FormControl('', {
        validators: [Validators.required]
      }),
      city: new FormControl('', {
        validators: [Validators.required, Validators.maxLength(50)]
      }),
    }),
    sources: new FormArray([
      new FormControl(false),
      new FormControl(false),
      new FormControl(false),
    ]),
    role: new FormControl<'student' | 'teacher' | 'employee' | 'founder' | 'other'>('student', {
      validators: [Validators.required]
    }),
    terms: new FormControl(false, {
      validators: [Validators.required],
    })
  })

  onSubmit() {
    if (this.form.invalid) {
      console.log('INVALID FORM')
      return;
    }
    console.log(this.form.value);
  }

  onResetForm() {
    this.form.reset();
  }
}
