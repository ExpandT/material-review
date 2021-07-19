import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export function passwordMatch(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const match = control.get('password')?.value === control.get('confirmPassword')?.value;
    if(!match) {
      control.get('confirmPassword')?.setErrors({passwordMismatch: true})
    }
    return match ? null : {passwordMismatch: true};
  };
}
