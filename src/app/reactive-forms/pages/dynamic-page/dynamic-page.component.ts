import { Component } from '@angular/core';
import { Form, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'forms-dynamic-page',
  templateUrl: './dynamic-page.component.html'
})
export class FormsDynamicPageComponent {
  private dynamicErrorMessagesData: { [keyError: string]: { message: string, parameter?: string }; } = {
    'required': { message: 'This field is required.' },
    'minlength': { message: 'Requires minimum {0} chars', parameter: 'requiredLength' }
  };

  public reactiveForm : FormGroup = this.builder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favGames: this.builder.array([
      ['Metal Gear', Validators.required],
      ['GOW', Validators.required]
    ])
  });

  public newFavControl: FormControl = new FormControl('', Validators.required);

  constructor(
    private builder: FormBuilder) { }

  get favGamesControl(): FormArray {
    return this.reactiveForm.get('favGames') as FormArray;
  }
  set favGamesControl(value : FormArray) {
    this.reactiveForm.controls['favGames'] = value;
  }

  isNotValidField(field: string): boolean | null {
      const control = this.reactiveForm.controls[field];
      return control.errors && control.touched;
    }

  isNotValid( formArray: FormArray, i : number) {
    return formArray.controls[i].touched && formArray.controls[i].errors;
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

    this.favGamesControl = this.builder.array([]);
    this.reactiveForm.reset();
    console.log(this.reactiveForm);
  }

  onDeleteFav(i : number) : void {
    this.favGamesControl.removeAt(i);
  }

  onAddFav() : void {
    if (this.newFavControl.invalid) return;
    this.favGamesControl.push( this.builder.control(this.newFavControl.value, Validators.required));
    this.newFavControl.reset();
  }

  /**
   * Avoid callingSubmit when clicking enter and instead call onAddFav
   * @param event
   * @returns
   */
  onKeyDown(event: KeyboardEvent) {
    if (event.key == 'Enter') {
      this.onAddFav();
      return false;
    }
    return true;
  }
}
