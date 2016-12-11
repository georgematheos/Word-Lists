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
var authentication_service_1 = require("../authentication/authentication.service");
var list_service_1 = require("../list.service");
// TODO: maybe make it easier to have special ones, like when there is 0 or 1 list
var listNumberMessagePrefix = 'You have ';
var listNumberMessageSuffix = ' lists';
var noListsMessage = 'You have no lists. Make one!';
var oneListMessage = 'You have 1 list';
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
            this.router.navigate(['/login']);
        }
        // get the word lists the user has
        this.listService.getLists(this.username).subscribe(function (lists) {
            _this.listTitles = lists.sort(function (a, b) {
                var A = a.toLowerCase();
                var B = b.toLowerCase();
                if (A < B) {
                    return -1;
                }
                else if (A > B) {
                    return 1;
                }
                else {
                    if (a < b) {
                        return -1;
                    }
                    if (a > b) {
                        return 1;
                    }
                    else {
                        return 0;
                    }
                }
            }); // alphabetize the lists
            console.log(lists);
            var listNumber = _this.listTitles.length;
            switch (listNumber) {
                case 0:
                    _this.listNumberMessage = noListsMessage;
                    break;
                case 1:
                    _this.listNumberMessage = oneListMessage;
                    break;
                default:
                    _this.listNumberMessage = listNumberMessagePrefix + String(listNumber) + listNumberMessageSuffix;
                    break;
            }
        }, function (err) {
            // TODO: NAVIGATE TO ERROR PAGE
            console.log(err);
        });
    };
    HomeComponent.prototype.titleButtonClick = function (listTitle) {
        this.router.navigate(['/list', listTitle]);
    };
    HomeComponent.prototype.logout = function () {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    };
    return HomeComponent;
}());
HomeComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'wl-home',
        templateUrl: 'home.component.html',
        styleUrls: ['home.component.css']
    }),
    __metadata("design:paramtypes", [router_1.Router, authentication_service_1.AuthenticationService, list_service_1.ListService])
], HomeComponent);
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map