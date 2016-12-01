import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { matching } from './matching.validator';

import { SignupService } from './signup.service';
import { AuthenticationService } from '../authentication.service';

@Component({
    moduleId: module.id,
    selector: 'wl-signup',
    templateUrl: 'signup.component.html',
    styleUrls: ['signup.component.css'],
    providers: [SignupService]
})
export class SignupComponent {
    displayError: boolean = false; // whether an error should be shown to the user (eg. Invalid Password)
    displayErrorText: string;

    form: FormGroup;

    minUsernameLength: number = 4; // TODO: MOVE THIS SOMEWHERE ELSE OUTSIDE SIGNUP OR LOGIN COMPONENTS
    minPasswordLength: number = 8;

    constructor(private authenticationService: AuthenticationService, private fb: FormBuilder, private router: Router, private signupService: SignupService) {
        this.form = fb.group({
            'username': [null, Validators.compose([Validators.required, Validators.minLength(this.minUsernameLength)])],
            'password': [null, Validators.compose([Validators.required, Validators.minLength(this.minPasswordLength), matching('confirmPassword', true)])],
            'confirmPassword': [null, Validators.compose([Validators.required, Validators.minLength(this.minPasswordLength), matching('password', false)])]
        })

    }

    // whether the username field is empty
    get usernameEmpty(): boolean {
        return this.form.controls['username'].errors && this.form.controls['username'].errors['required'];
    }

    // whether the username is too short
    get usernameTooShort(): boolean {
        return this.form.controls['username'].errors && (this.form.controls['username'].errors['required'] || this.form.controls['username'].errors['minlength']);
    }

    // whether the password field is empty
    get passwordEmpty(): boolean {
        return this.form.controls['password'].errors && this.form.controls['password'].errors['required'];
    }

    // whether the password is too short
    get passwordTooShort(): boolean {
        return this.form.controls['password'].errors && (this.form.controls['password'].errors['required'] || this.form.controls['password'].errors['minlength']);
    }


    get confirmPasswordEmpty(): boolean {
        return this.form.controls['confirmPassword'].errors && this.form.controls['confirmPassword'].errors['required'];
    }

    // whether the confirmation password is too short
    get confirmPasswordTooShort(): boolean {
        return this.form.controls['confirmPassword'].errors && (this.form.controls['confirmPassword'].errors['required'] || this.form.controls['confirmPassword'].errors['minlength']);
    }

    get passwordMismatch(): boolean {
        return this.form.controls['confirmPassword'].errors ? this.form.controls['confirmPassword'].errors['mismatch'] : false;
    }

    onSubmit(event) {
        this.signupService.signup(this.form.controls['username'].value, this.form.controls['password'].value).subscribe((res) => {
            // log in the newly created user
            this.authenticationService.login(this.form.controls['username'].value, this.form.controls['password'].value).subscribe((res) => {
                this.router.navigate(['/home', this.authenticationService.getUsername()]);
                // TODO: DO I NEED TO DO ANYTHING IN HERE OR ANY SORT OF ERROR HANDLING???
            }, err => console.log(err));
        },
            (err) => {
                switch (err.status) {
                    // user with username already exists
                    case 409:
                        this.displayErrorText = `Username taken.  Try again with a different username.`
                        this.displayError = true;
                        this.form.controls['password'].setValue('');
                        this.form.controls['confirmPassword'].setValue('');
                        break;
                    default:
                        // TODO: handle this situation better
                        console.log(err);
                }
            });

        event.preventDefault(); // prevent the default page reload on submit button click
    }
}
