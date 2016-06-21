import { Component } from '@angular/core';
import { Control, ControlGroup, FormBuilder, NgForm, Validators } from '@angular/common';
import { Router, ROUTER_DIRECTIVES } from '@angular/router-deprecated';

import { matching } from './matching.validator';

@Component({
  moduleId: module.id,
  selector: 'wl-signup',
  templateUrl: 'signup.component.html',
  styleUrls: ['signup.component.css'],
  directives: [ROUTER_DIRECTIVES]
})
export class SignupComponent {
    username: Control;
    password: Control;
    confirmPassword: Control;

    displayError: boolean = false; // whether an error should be shown to the user (eg. Invalid Password)
    displayErrorText: string;

    form: ControlGroup;

    minUsernameLength: number = 4; // TODO: MOVE THIS SOMEWHERE ELSE OUTSIDE SIGNUP OR LOGIN COMPONENTS
    minPasswordLength: number = 8;

    constructor(private builder: FormBuilder) {
        // create username and password controls
        this.username = new Control('', Validators.compose([Validators.required, Validators.minLength(this.minUsernameLength)]));
        this.password = new Control('', Validators.compose([Validators.required, Validators.minLength(this.minPasswordLength)]));
        this.confirmPassword = new Control('', Validators.compose([Validators.required, Validators.minLength(this.minPasswordLength)])); // TODO: MAKE A VALIDATOR SO THAT IT MUST EQUAL PASSWORD

        // create the form
        this.form = builder.group({
            username: this.username,
            password: this.password,
            confirmPassword: this.confirmPassword
        }, {validator: matching('password', 'confirmPassword')});

    }

    // whether the username field is empty
    get usernameEmpty(): boolean {
        return this.username.errors && this.username.errors['required'];
    }

    // whether the username is too short
    get usernameTooShort(): boolean {
        return this.username.errors && (this.username.errors['required'] || this.username.errors['minlength']);
    }

    // whether the password field is empty
    get passwordEmpty(): boolean {
        return this.password.errors && this.password.errors['required'];
    }

    // whether the password is too short
    get passwordTooShort(): boolean {
        return this.password.errors && (this.password.errors['required'] || this.password.errors['minlength']);
    }


    get confirmPasswordEmpty(): boolean {
        return this.confirmPassword.errors && this.confirmPassword.errors['required'];
    }

    // whether the confirmation password is too short
    get confirmPasswordTooShort(): boolean {
        return this.confirmPassword.errors && (this.confirmPassword.errors['required'] || this.confirmPassword.errors['minlength']);
    }

    get passwordMismatch(): boolean {
        return this.form.errors ? this.form.errors['mismatch'] : false;
    }

    onSubmit(event) {
        console.log(this.form);
    }

}
