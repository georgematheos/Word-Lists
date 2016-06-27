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
var http_1 = require('@angular/http');
var Rx_1 = require('rxjs/Rx');
var AuthenticationService = (function () {
    function AuthenticationService(http) {
        this.http = http;
        this.loggedIn = false;
        this.loggedIn = !!localStorage.getItem('auth_token'); // logged in is true if there is a token stored
    }
    AuthenticationService.prototype.login = function (username, password) {
        var _this = this;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var url = 'http://' + location.host + '/api/authenticate/local';
        var body = JSON.stringify({
            username: username,
            password: password
        });
        return this.http.post(url, body, { headers: headers })
            .map(function (res) { return _this.extractToken(res, username); });
    };
    AuthenticationService.prototype.logout = function () {
        localStorage.removeItem('auth_token');
        this.loggedIn = false;
        this.username = null;
    };
    AuthenticationService.prototype.isLoggedIn = function () {
        // check to make sure the user is truly logged in
        this.loggedIn = !!localStorage.getItem('auth_token'); // logged in is true if there is a token stored
        // TODO: CHECK IF TOKEN IS STILL VALID
        return this.loggedIn;
    };
    // retrns the current auth_token or null if there is no tokens
    AuthenticationService.prototype.getToken = function () {
        if (this.isLoggedIn()) {
            return localStorage.getItem('auth_token');
        }
        // if the user is not logged in, the auth token is invalid, so return null
        return null;
    };
    AuthenticationService.prototype.getUsername = function () {
        return this.username;
    };
    AuthenticationService.prototype.extractToken = function (res, username) {
        // extract the json body
        var body = res.json() || {};
        // make sure a token is within the body (if no body provided, this error will be triggered)
        if (!body.token) {
            Rx_1.Observable.throw(new Error('no token in response body'));
        }
        // set the token in the local storage
        localStorage.setItem('auth_token', body.token);
        this.loggedIn = true; // set the logged in value
        this.username = username; // get the username
        // return the token
        return body.token;
    };
    AuthenticationService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], AuthenticationService);
    return AuthenticationService;
}());
exports.AuthenticationService = AuthenticationService;
//# sourceMappingURL=authentication.service.js.map