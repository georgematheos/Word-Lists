import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from '../authentication.service';

@Component({
    selector: 'wl-login',
    moduleId: module.id,
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit{
    displayError: boolean = false; // whether an error should be shown to the user (eg. Invalid Password)
    displayErrorText: string;

    form: FormGroup;

    minUsernameLength: number = 4;
    minPasswordLength: number = 8;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        this.form = fb.group({
            'username': [null, Validators.compose([Validators.required, Validators.minLength(this.minUsernameLength)])],
            'password': [null, Validators.compose([Validators.required, Validators.minLength(this.minPasswordLength)])]
        })
    }

    ngOnInit() {
        if (this.authenticationService.isLoggedIn()) {
            this.router.navigate(['/home', this.authenticationService.getUsername()]);
        }
    }

    // whether the username field is empty
    get usernameEmpty(): boolean {
        return this.form.controls['username'].errors && this.form.controls['username'].errors['required'];
    }

    // whether the password field is empty
    get passwordEmpty(): boolean {
        return this.form.controls['password'].errors && this.form.controls['password'].errors['required'];
    }

    onSubmit(event) {
        this.authenticationService.login(this.form.controls['username'].value, this.form.controls['password'].value)
            .subscribe((token) => {
                this.router.navigate(['/home', this.authenticationService.getUsername()]);
            }, (err) => {
                switch (err.status) {
                    // username not recognized
                    case 404:
                        console.log('In 404 handler');
                        this.displayErrorText = 'Username not recognized.  Please try again.';
                        this.displayError = true;
                        this.form.controls['password'].setValue('');
                        break;
                    // password does not match one on file
                    case 401:
                        console.log('In 401 handler');
                        this.displayErrorText = 'Password does not match one on file for this username.  Please try again.';
                        this.displayError = true;
                        this.form.controls['password'].setValue('');
                        break;
                    default:
                        // TODO: HANDLE THIS SCENARIO
                        break;
                }
            });

        event.preventDefault(); // prevent the default page reload on submit button click
    }

}
