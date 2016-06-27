import { Component, OnInit } from '@angular/core';
import { Control, ControlGroup, FormBuilder, NgForm, Validators } from '@angular/common';
import { Router, ROUTER_DIRECTIVES } from '@angular/router-deprecated';

import { AuthenticationService } from '../authentication.service';

@Component({
    selector: 'wl-login',
    moduleId: module.id,
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css'],
    directives: [ROUTER_DIRECTIVES]
})
export class LoginComponent implements OnInit{
    username: Control;
    password: Control;

    displayError: boolean = false; // whether an error should be shown to the user (eg. Invalid Password)
    displayErrorText: string;

    form: ControlGroup;

    minUsernameLength: number = 4;
    minPasswordLength: number = 8;

    constructor(private builder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService) {
        // create username and password controls
        this.username = new Control('', Validators.compose([Validators.required, Validators.minLength(this.minUsernameLength)]));
        this.password = new Control('', Validators.compose([Validators.required, Validators.minLength(this.minPasswordLength)]));

        // create the form
        this.form = builder.group({
            username: this.username,
            password: this.password
        });
    }

    ngOnInit() {
        if (this.authenticationService.isLoggedIn()) {
            this.router.parent.navigate(['Home', { username: this.authenticationService.getUsername() }]);
        }
    }

    // whether the username field is empty
    get usernameEmpty(): boolean {
        return this.username.errors && this.username.errors['required'];
    }

    // whether the password field is empty
    get passwordEmpty(): boolean {
        return this.password.errors && this.password.errors['required'];
    }

    onSubmit(event) {
        this.authenticationService.login(this.username.value, this.password.value)
            .subscribe((token) => {
                this.router.parent.navigate(['Home', { username: this.authenticationService.getUsername() }]);
            }, (err) => {
                switch (err.status) {
                    // username not recognized
                    case 404:
                        console.log('In 404 handler');
                        this.displayErrorText = 'Username not recognized.  Please try again.';
                        this.displayError = true;
                        this.password.updateValue('');
                        break;
                    // password does not match one on file
                    case 401:
                        console.log('In 401 handler');
                        this.displayErrorText = 'Password does not match one on file for this username.  Please try again.';
                        this.displayError = true;
                        this.password.updateValue('');
                        break;
                    default:
                        // TODO: HANDLE THIS SCENARIO
                        break;
                }
            });

        event.preventDefault(); // prevent the default page reload on submit button click
    }

}
