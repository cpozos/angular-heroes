import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'forms-switches-page',
  templateUrl: './switches-page.component.html'
})
export class FormsSwitchesPageComponent {

  public reactiveForm: FormGroup = this.builder.group({
    gender: ['M', Validators.required],
    wantNotifications: [true, Validators.required],
    termsAndConditions: [false, Validators.requiredTrue]
  });

  constructor(private builder: FormBuilder) {
  }

  isNotValidField(field: string): boolean | null {
    const control = this.reactiveForm.controls[field];
    return control.errors && control.touched;
  }

  onSave() {
    if (this.reactiveForm.invalid) {
      this.reactiveForm.markAllAsTouched();
      return;
    }

    this.reactiveForm.reset();
  }
}
