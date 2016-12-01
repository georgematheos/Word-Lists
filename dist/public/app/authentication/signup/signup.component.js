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
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var matching_validator_1 = require("./matching.validator");
var signup_service_1 = require("./signup.service");
var authentication_service_1 = require("../authentication.service");
var SignupComponent = (function () {
    function SignupComponent(authenticationService, fb, router, signupService) {
        this.authenticationService = authenticationService;
        this.fb = fb;
        this.router = router;
        this.signupService = signupService;
        this.displayError = false; // whether an error should be shown to the user (eg. Invalid Password)
        this.minUsernameLength = 4; // TODO: MOVE THIS SOMEWHERE ELSE OUTSIDE SIGNUP OR LOGIN COMPONENTS
        this.minPasswordLength = 8;
        this.form = fb.group({
            'username': [null, forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(this.minUsernameLength)])],
            'password': [null, forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(this.minPasswordLength), matching_validator_1.matching('confirmPassword', true)])],
            'confirmPassword': [null, forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(this.minPasswordLength), matching_validator_1.matching('password', false)])]
        });
    }
    Object.defineProperty(SignupComponent.prototype, "usernameEmpty", {
        // whether the username field is empty
        get: function () {
            return this.form.controls['username'].errors && this.form.controls['username'].errors['required'];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SignupComponent.prototype, "usernameTooShort", {
        // whether the username is too short
        get: function () {
            return this.form.controls['username'].errors && (this.form.controls['username'].errors['required'] || this.form.controls['username'].errors['minlength']);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SignupComponent.prototype, "passwordEmpty", {
        // whether the password field is empty
        get: function () {
            return this.form.controls['password'].errors && this.form.controls['password'].errors['required'];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SignupComponent.prototype, "passwordTooShort", {
        // whether the password is too short
        get: function () {
            return this.form.controls['password'].errors && (this.form.controls['password'].errors['required'] || this.form.controls['password'].errors['minlength']);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SignupComponent.prototype, "confirmPasswordEmpty", {
        get: function () {
            return this.form.controls['confirmPassword'].errors && this.form.controls['confirmPassword'].errors['required'];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SignupComponent.prototype, "confirmPasswordTooShort", {
        // whether the confirmation password is too short
        get: function () {
            return this.form.controls['confirmPassword'].errors && (this.form.controls['confirmPassword'].errors['required'] || this.form.controls['confirmPassword'].errors['minlength']);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SignupComponent.prototype, "passwordMismatch", {
        get: function () {
            return this.form.controls['confirmPassword'].errors ? this.form.controls['confirmPassword'].errors['mismatch'] : false;
        },
        enumerable: true,
        configurable: true
    });
    SignupComponent.prototype.onSubmit = function (event) {
        var _this = this;
        this.signupService.signup(this.form.controls['username'].value, this.form.controls['password'].value).subscribe(function (res) {
            // log in the newly created user
            _this.authenticationService.login(_this.form.controls['username'].value, _this.form.controls['password'].value).subscribe(function (res) {
                _this.router.navigate(['/home', _this.authenticationService.getUsername()]);
                // TODO: DO I NEED TO DO ANYTHING IN HERE OR ANY SORT OF ERROR HANDLING???
            }, function (err) { return console.log(err); });
        }, function (err) {
            switch (err.status) {
                // user with username already exists
                case 409:
                    _this.displayErrorText = "Username taken.  Try again with a different username.";
                    _this.displayError = true;
                    _this.form.controls['password'].setValue('');
                    _this.form.controls['confirmPassword'].setValue('');
                    break;
                default:
                    // TODO: handle this situation better
                    console.log(err);
            }
        });
        event.preventDefault(); // prevent the default page reload on submit button click
    };
    return SignupComponent;
}());
SignupComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'wl-signup',
        templateUrl: 'signup.component.html',
        styleUrls: ['signup.component.css'],
        providers: [signup_service_1.SignupService]
    }),
    __metadata("design:paramtypes", [authentication_service_1.AuthenticationService, forms_1.FormBuilder, router_1.Router, signup_service_1.SignupService])
], SignupComponent);
exports.SignupComponent = SignupComponent;
//# sourceMappingURL=signup.component.js.map