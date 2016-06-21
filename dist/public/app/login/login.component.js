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
var router_deprecated_1 = require('@angular/router-deprecated');
var authentication_service_1 = require('../authentication.service');
var LoginComponent = (function () {
    function LoginComponent(builder, router, authenticationService) {
        this.builder = builder;
        this.router = router;
        this.authenticationService = authenticationService;
        this.displayError = false; // whether an error should be shown to the user (eg. Invalid Password)
        this.minUsernameLength = 4;
        this.minPasswordLength = 8;
        // create username and password controls
        this.username = new common_1.Control('', common_1.Validators.compose([common_1.Validators.required, common_1.Validators.minLength(this.minUsernameLength)]));
        this.password = new common_1.Control('', common_1.Validators.compose([common_1.Validators.required, common_1.Validators.minLength(this.minPasswordLength)]));
        // create the form
        this.form = builder.group({
            username: this.username,
            password: this.password
        });
    }
    Object.defineProperty(LoginComponent.prototype, "usernameEmpty", {
        // whether the username field is empty
        get: function () {
            return this.username.errors && this.username.errors['required'];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoginComponent.prototype, "passwordEmpty", {
        // whether the password field is empty
        get: function () {
            return this.password.errors && this.password.errors['required'];
        },
        enumerable: true,
        configurable: true
    });
    LoginComponent.prototype.onSubmit = function (event) {
        var _this = this;
        this.authenticationService.login(this.username.value, this.password.value)
            .subscribe(function (token) {
            console.log('Hello there!');
            console.log(token);
            if (token) {
                _this.router.parent.navigate(['Home']);
            }
        }, function (err) {
            switch (err.status) {
                // username not recognized
                case 404:
                    console.log('In 404 handler');
                    _this.displayErrorText = 'Username not recognized.  Please try again.';
                    _this.displayError = true;
                    _this.password.updateValue('');
                    break;
                // password does not match one on file
                case 401:
                    console.log('In 401 handler');
                    _this.displayErrorText = 'Password does not match one on file for this username.  Please try again.';
                    _this.displayError = true;
                    _this.password.updateValue('');
                    break;
                default:
                    // TODO: HANDLE THIS SCENARIO
                    break;
            }
        });
        event.preventDefault(); // prevent the default page reload on submit button click
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'wl-login',
            moduleId: module.id,
            templateUrl: 'login.component.html',
            styleUrls: ['login.component.css'],
            directives: [router_deprecated_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [common_1.FormBuilder, router_deprecated_1.Router, authentication_service_1.AuthenticationService])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map