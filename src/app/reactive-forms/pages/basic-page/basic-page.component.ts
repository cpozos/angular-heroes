import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'forms-basic-page',
  templateUrl: './basic-page.component.html'
})
export class FormsBasicPageComponent implements OnInit {

  private resetDefaultValues = {
    name: '',
    price: 2500,
    inStorage: 6
  };

  // It does the same as FormBuilder:
  // private form: FormGroup = new FormGroup({
  //   name: new FormControl('', [], []),
  //   price: new FormControl(0, [], []),
  //   inStorage: new FormControl(0, [], []),
  // });

  public reactiveForm: FormGroup = this.formBuilder.group({
    name: ['', [ Validators.required, Validators.minLength(3) ]],
    price: [0, [ Validators.required, Validators.min(0) ]],
    inStorage: [0, [ Validators.required, Validators.min(0) ]]
  });

  private dynamicErrorMessagesData: { [keyError: string]: { message: string, parameter?: string }; } = {
    'required': { message: 'This field is required.' },
    'minlength': { message: 'Requires minimum {0} chars', parameter: 'requiredLength' }
  };

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.reactiveForm.reset(this.resetDefaultValues);
  }

  isNotValidField(field: string): boolean | null {
    const control = this.reactiveForm.controls[field];
    return control.errors && control.touched;
  }

  getFieldError(field: string): string {
    const errors = this.reactiveForm.controls[field]?.errors;
    if (!errors) return '';

    const keyError = Object.keys(errors)[0];
    const errorData = this.dynamicErrorMessagesData[keyError];

    return errorData.parameter
      ? errorData.message.replace('{0}', errors[keyError][errorData.parameter])
      : errorData.message;
  }

  onSave(): void {
    if (this.reactiveForm.invalid) {
      this.reactiveForm.markAllAsTouched();
      return;
    }

    this.reactiveForm.reset(this.resetDefaultValues);
    console.log(this.reactiveForm);
  }
}
