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
var router_deprecated_1 = require('@angular/router-deprecated');
var http_1 = require('@angular/http');
var authentication_service_1 = require('./authentication.service');
var list_service_1 = require('./list.service');
var home_component_1 = require('./home/home.component');
var login_component_1 = require('./login/login.component');
var signup_component_1 = require('./signup/signup.component');
var unrecognized_path_component_1 = require('./unrecognized-path/unrecognized-path.component');
var AppComponent = (function () {
    function AppComponent() {
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: 'wl-app',
            moduleId: module.id,
            templateUrl: 'app.component.html',
            styleUrls: ['app.component.css'],
            directives: [
                login_component_1.LoginComponent,
                home_component_1.HomeComponent,
                unrecognized_path_component_1.UnrecognizedPathComponent,
                router_deprecated_1.ROUTER_DIRECTIVES
            ],
            providers: [
                http_1.HTTP_PROVIDERS,
                authentication_service_1.AuthenticationService,
                list_service_1.ListService
            ]
        }),
        router_deprecated_1.RouteConfig([
            { path: '/', redirectTo: ['Login'] },
            { path: '/home/:username', name: 'Home', component: home_component_1.HomeComponent },
            { path: '/login', name: 'Login', component: login_component_1.LoginComponent },
            { path: '/signup', name: 'Signup', component: signup_component_1.SignupComponent },
            { path: '/*path', name: 'UnrecognizedPath', component: unrecognized_path_component_1.UnrecognizedPathComponent } // unrecognized url
        ]), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map