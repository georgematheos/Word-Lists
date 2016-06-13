import { Component } from '@angular/core';
import { Control, ControlGroup, FormBuilder, NgForm, Validators } from '@angular/common';

@Component({
    selector: 'wl-login',
    moduleId: module.id,
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})
export class LoginComponent {
    username: Control;
    password: Control;

    form: ControlGroup;

    minUsernameLength: number = 4;
    minPasswordLength: number = 8;

    constructor(private builder: FormBuilder) {
        // create username and password controls
        this.username = new Control('', Validators.compose([Validators.required, Validators.minLength(this.minUsernameLength)]));
        this.password = new Control('', Validators.compose([Validators.required, Validators.minLength(this.minPasswordLength)]));

        // create the form
        this.form = builder.group({
            username: this.username,
            password: this.password
        });
    }

    // whether the username field is empty
    get usernameEmpty(): boolean {
        return this.username.errors && this.username.errors['required'];
    }

    // whether the password field is empty
    get passwordEmpty(): boolean {
        return this.password.errors && this.password.errors['required'];
    }


    get diagnostic() {
        return JSON.stringify({ form_value: this.form.value, form_valid: this.form.valid });
    }
}
