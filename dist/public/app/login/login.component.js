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
var LoginComponent = (function () {
    function LoginComponent(builder) {
        this.builder = builder;
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
    Object.defineProperty(LoginComponent.prototype, "diagnostic", {
        get: function () {
            return JSON.stringify({ form_value: this.form.value, form_valid: this.form.valid });
        },
        enumerable: true,
        configurable: true
    });
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'wl-login',
            moduleId: module.id,
            templateUrl: 'login.component.html',
            styleUrls: ['login.component.css']
        }), 
        __metadata('design:paramtypes', [common_1.FormBuilder])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map