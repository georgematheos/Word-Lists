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
var router_1 = require("@angular/router");
var home_component_1 = require("./lists/home/home.component");
var list_component_1 = require("./lists/list/list.component");
var login_component_1 = require("./authentication/login/login.component");
var signup_component_1 = require("./authentication/signup/signup.component");
var unrecognized_path_component_1 = require("./unrecognized-path/unrecognized-path.component");
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    return AppRoutingModule;
}());
AppRoutingModule = __decorate([
    core_1.NgModule({
        imports: [
            router_1.RouterModule.forRoot([
                { path: '', pathMatch: 'full', redirectTo: '/login' },
                { path: 'home', component: home_component_1.HomeComponent },
                { path: 'list', component: list_component_1.ListComponent },
                { path: 'list/:title', component: list_component_1.ListComponent },
                { path: 'login', component: login_component_1.LoginComponent },
                { path: 'signup', component: signup_component_1.SignupComponent },
                { path: '**', component: unrecognized_path_component_1.UnrecognizedPathComponent }
            ])
        ],
        exports: [router_1.RouterModule]
    }),
    __metadata("design:paramtypes", [])
], AppRoutingModule);
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=app-routing.module.js.map