import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {PasswordFieldType} from "../shared/password-field-type";
import {passwordMatch} from "../shared/password-match.directive";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ModalComponent} from "../modal/modal.component";
import {tap} from "rxjs/operators";


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPageComponent {

  signUpForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required]
  }, {validators: passwordMatch()})

  showPassword = false;
  showConfirmPassword = false;


  get passwordFieldType(): PasswordFieldType {
    return this.showPassword ? 'text' : 'password';
  }

  get confirmPasswordFieldType(): PasswordFieldType {
    return this.showConfirmPassword ? 'text' : 'password';
  }

  constructor(private readonly formBuilder: FormBuilder, private readonly matDialog: MatDialog) {
    this.signUpForm.valueChanges.pipe(
      tap(() => console.log(this.signUpForm))).subscribe()
  }

  openModal(){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.id = 'modal-component';
    dialogConfig.height = '664px';
    dialogConfig.width = '488px';

    this.matDialog.open(ModalComponent, dialogConfig)

  }


  iconName(value: boolean): 'visibility' | 'visibility_off' {
    return value ? "visibility" : "visibility_off";
  }

  changePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  changeConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  submit() {
    let submitData = {
      email: this.signUpForm.get('email')?.value,
      password: this.signUpForm.get('password')?.value,
      confirmPassword: this.signUpForm.get('confirmPassword')?.value,
    }
    console.log(submitData);
    this.signUpForm.reset();
    this.signUpForm.markAsPristine();
    this.signUpForm.updateValueAndValidity();
  }
}
