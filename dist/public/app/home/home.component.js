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
var authentication_service_1 = require('../authentication.service');
var list_service_1 = require('../list.service');
var HomeComponent = (function () {
    function HomeComponent(router, authenticationService, listService) {
        this.router = router;
        this.authenticationService = authenticationService;
        this.listService = listService;
        this.username = this.authenticationService.getUsername();
    }
    Object.defineProperty(HomeComponent.prototype, "token", {
        get: function () {
            return localStorage.getItem('auth_token');
        },
        enumerable: true,
        configurable: true
    });
    HomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        // if the user is not logged in, navigate to the login page
        // TODO: ACCOUNT FOR INVALID TOKENS
        if (!this.authenticationService.isLoggedIn()) {
            this.router.parent.navigate(['Login']);
        }
        // get the word lists the user has
        this.listService.getLists(this.username).subscribe(function (lists) {
            _this.listTitles = lists;
            console.log(lists);
        }, function (err) {
            // TODO: NAVIGATE TO ERROR PAGE
            console.log(err);
        });
    };
    HomeComponent.prototype.logout = function () {
        this.authenticationService.logout();
        this.router.parent.navigate(['Login']);
    };
    HomeComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'wl-home',
            templateUrl: 'home.component.html',
            styleUrls: ['home.component.css'],
            directives: [router_deprecated_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [router_deprecated_1.Router, authentication_service_1.AuthenticationService, list_service_1.ListService])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map