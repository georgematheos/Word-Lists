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
var authentication_service_1 = require("../authentication.service");
var LoginComponent = (function () {
    function LoginComponent(fb, router, authenticationService) {
        this.fb = fb;
        this.router = router;
        this.authenticationService = authenticationService;
        this.displayError = false; // whether an error should be shown to the user (eg. Invalid Password)
        this.minUsernameLength = 4;
        this.minPasswordLength = 8;
        this.form = fb.group({
            'username': [null, forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(this.minUsernameLength)])],
            'password': [null, forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(this.minPasswordLength)])]
        });
    }
    LoginComponent.prototype.ngOnInit = function () {
        if (this.authenticationService.isLoggedIn()) {
            this.router.navigate(['/home']);
        }
    };
    Object.defineProperty(LoginComponent.prototype, "usernameEmpty", {
        // whether the username field is empty
        get: function () {
            return this.form.controls['username'].errors && this.form.controls['username'].errors['required'];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoginComponent.prototype, "passwordEmpty", {
        // whether the password field is empty
        get: function () {
            return this.form.controls['password'].errors && this.form.controls['password'].errors['required'];
        },
        enumerable: true,
        configurable: true
    });
    LoginComponent.prototype.onSubmit = function (event) {
        var _this = this;
        this.authenticationService.login(this.form.controls['username'].value, this.form.controls['password'].value)
            .subscribe(function (token) {
            _this.router.navigate(['/home']);
        }, function (err) {
            switch (err.status) {
                // username not recognized
                case 404:
                    console.log('In 404 handler');
                    _this.displayErrorText = 'Username not recognized.  Please try again.';
                    _this.displayError = true;
                    _this.form.controls['password'].setValue('');
                    break;
                // password does not match one on file
                case 401:
                    console.log('In 401 handler');
                    _this.displayErrorText = 'Password does not match one on file for this username.  Please try again.';
                    _this.displayError = true;
                    _this.form.controls['password'].setValue('');
                    break;
                default:
                    // TODO: HANDLE THIS SCENARIO
                    break;
            }
        });
        event.preventDefault(); // prevent the default page reload on submit button click
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    core_1.Component({
        selector: 'wl-login',
        moduleId: module.id,
        templateUrl: 'login.component.html',
        styleUrls: ['login.component.css']
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder,
        router_1.Router,
        authentication_service_1.AuthenticationService])
], LoginComponent);
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map