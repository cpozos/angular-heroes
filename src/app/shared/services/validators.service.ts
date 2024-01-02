import { Injectable } from "@angular/core";
import { AbstractControl, FormGroup, ValidationErrors } from "@angular/forms";

@Injectable( { providedIn: "root" })
export class ValidatorService {

  public firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  public isNotValidField(reactiveForm: FormGroup, field: string): boolean | null {
    const control = reactiveForm.controls[field];
    return control.errors && control.touched;
  }

  public fieldsMustBeEqual(field1 : string, field2: string) {
    return (formGroup: AbstractControl<any, any>): ValidationErrors | null => {

      const val1 = formGroup.get(field1)?.value;
      const val2 = formGroup.get(field2)?.value;

      if (val1 !== val2) {
        const error = { notEqual: true };
        formGroup.get(field2)?.setErrors(error);
        return error;
      }

      let errors = formGroup.get(field2)?.errors;
      if (errors) {
        delete errors['notEqual'];
        formGroup.get(field2)?.setErrors(errors);
      }

      return null;
    };
  }
}
