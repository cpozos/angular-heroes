import { Injectable } from "@angular/core";
import { AbstractControl, AsyncValidator, ValidationErrors } from "@angular/forms";
import { Observable, delay } from "rxjs";

@Injectable( { providedIn: "root" })
export class EmailValidatorService implements AsyncValidator {

  validate(control: AbstractControl<any, any>): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {

    const email = control.value;

    const httpCallObs = new Observable<ValidationErrors | null>((subscriber) => {
      if (email === 'fer@google.com') {
        subscriber.next({ emailTaken: true });
        subscriber.complete();
        return;
      }

      subscriber.next(null);
      subscriber.complete();
    });

    return httpCallObs.pipe(delay(3000));
  }

  registerOnValidatorChange?(fn: () => void): void {
    throw new Error("Method not implemented.");
  }
}
