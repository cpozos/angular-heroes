import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { emailPattern, mustNotBeStrider } from '../../../shared/validators/validators';
import { ValidatorService } from '../../../shared/services/validators.service';
import { EmailValidatorService } from '../../../shared/validators/email-validator.service';

@Component({
  selector: 'forms-register-page',
  templateUrl: './register-page.component.html'
})
export class FormsRegisterPageComponent {

  public reactiveForm: FormGroup = this.builder.group(
    {
      name: ['', [ Validators.required, Validators.pattern(this.validatorService.firstNameAndLastnamePattern)]],
      email: ['', [ Validators.required, Validators.pattern(emailPattern) ], [ this.emailValidator ]],
      username: ['', [ Validators.required, mustNotBeStrider ]],
      password: ['', [ Validators.required, Validators.minLength(6) ]],
      password2: ['', [ Validators.required ]],
    },
    {
      validators: [ this.validatorService.fieldsMustBeEqual('password', 'password2') ]
    }
  );

  constructor(
    private builder: FormBuilder,
    private validatorService: ValidatorService,
    private emailValidator: EmailValidatorService
  ) { }

  isNotValidField(field : string) : boolean | null {
    return this.validatorService.isNotValidField(this.reactiveForm, field);
  }

  onSave() {
    this.reactiveForm.markAllAsTouched();
  }
}
