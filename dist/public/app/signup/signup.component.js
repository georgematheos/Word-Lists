"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var router_1 = require('@angular/router');
var matching_validator_1 = require('./matching.validator');
var signup_service_1 = require('./signup.service');
var authentication_service_1 = require('../authentication.service');
var SignupComponent = (function () {
    function SignupComponent(authenticationService, builder, router, signupService) {
        this.authenticationService = authenticationService;
        this.builder = builder;
        this.router = router;
        this.signupService = signupService;
        this.displayError = false; // whether an error should be shown to the user (eg. Invalid Password)
        this.minUsernameLength = 4; // TODO: MOVE THIS SOMEWHERE ELSE OUTSIDE SIGNUP OR LOGIN COMPONENTS
        this.minPasswordLength = 8;
        // create username and password controls
        this.username = new common_1.Control('', common_1.Validators.compose([common_1.Validators.required, common_1.Validators.minLength(this.minUsernameLength)]));
        this.password = new common_1.Control('', common_1.Validators.compose([common_1.Validators.required, common_1.Validators.minLength(this.minPasswordLength)]));
        this.confirmPassword = new common_1.Control('', common_1.Validators.compose([common_1.Validators.required, common_1.Validators.minLength(this.minPasswordLength)]));
        // create the form
        this.form = builder.group({
            username: this.username,
            password: this.password,
            confirmPassword: this.confirmPassword
        }, { validator: matching_validator_1.matching('password', 'confirmPassword') });
    }
    Object.defineProperty(SignupComponent.prototype, "usernameEmpty", {
        // whether the username field is empty
        get: function () {
            return this.username.errors && this.username.errors['required'];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SignupComponent.prototype, "usernameTooShort", {
        // whether the username is too short
        get: function () {
            return this.username.errors && (this.username.errors['required'] || this.username.errors['minlength']);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SignupComponent.prototype, "passwordEmpty", {
        // whether the password field is empty
        get: function () {
            return this.password.errors && this.password.errors['required'];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SignupComponent.prototype, "passwordTooShort", {
        // whether the password is too short
        get: function () {
            return this.password.errors && (this.password.errors['required'] || this.password.errors['minlength']);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SignupComponent.prototype, "confirmPasswordEmpty", {
        get: function () {
            return this.confirmPassword.errors && this.confirmPassword.errors['required'];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SignupComponent.prototype, "confirmPasswordTooShort", {
        // whether the confirmation password is too short
        get: function () {
            return this.confirmPassword.errors && (this.confirmPassword.errors['required'] || this.confirmPassword.errors['minlength']);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SignupComponent.prototype, "passwordMismatch", {
        get: function () {
            return this.form.errors ? this.form.errors['mismatch'] : false;
        },
        enumerable: true,
        configurable: true
    });
    SignupComponent.prototype.onSubmit = function (event) {
        var _this = this;
        this.signupService.signup(this.username.value, this.password.value).subscribe(function (res) {
            // log in the newly created user
            _this.authenticationService.login(_this.username.value, _this.password.value).subscribe(function (res) {
                _this.router.navigate(['/home', _this.authenticationService.getUsername()]);
                // TODO: DO I NEED TO DO ANYTHING IN HERE OR ANY SORT OF ERROR HANDLING???
            }, function (err) { return console.log(err); });
        }, function (err) {
            switch (err.status) {
                // user with username already exists
                case 409:
                    _this.displayErrorText = "Username taken.  Try again with a different username.";
                    _this.displayError = true;
                    _this.password.updateValue('');
                    _this.confirmPassword.updateValue('');
                    break;
                default:
                    // TODO: handle this situation better
                    console.log(err);
            }
        });
        event.preventDefault(); // prevent the default page reload on submit button click
    };
    SignupComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'wl-signup',
            templateUrl: 'signup.component.html',
            styleUrls: ['signup.component.css'],
            directives: [router_1.ROUTER_DIRECTIVES],
            providers: [signup_service_1.SignupService]
        }), 
        __metadata('design:paramtypes', [authentication_service_1.AuthenticationService, common_1.FormBuilder, router_1.Router, signup_service_1.SignupService])
    ], SignupComponent);
    return SignupComponent;
}());
exports.SignupComponent = SignupComponent;
//# sourceMappingURL=signup.component.js.map