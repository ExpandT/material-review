import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export function passwordMatch(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const match = control.get('password')?.value === control.get('confirmPassword')?.value;
    return match ? null : {passwordMismatch: true};
  };
}
