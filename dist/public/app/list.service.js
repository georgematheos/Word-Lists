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
var authentication_service_1 = require('./authentication.service');
var ListService = (function () {
    function ListService(http, authenticationService) {
        this.http = http;
        this.authenticationService = authenticationService;
    }
    ListService.prototype.getLists = function (username) {
        var _this = this;
        // get the token and throw an error if none is available
        var auth_token = this.authenticationService.getToken();
        if (!auth_token) {
            return Rx_1.Observable.throw(new Error('no auth token available from the authenticationService'));
        }
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json'); // add the content type to the headers
        headers.append('x-auth-token', auth_token); // add the token to the headers
        var url = 'http://' + location.host + ("/api/word_lists/" + username);
        // return an observable of the array of word lists
        return this.http.get(url, { headers: headers }).map(function (res) { return _this.extractData(res, 'word-lists'); });
    };
    ListService.prototype.getWords = function (username, listTitle) {
        var _this = this;
        // get the token and throw an error if none is available
        var auth_token = this.authenticationService.getToken();
        if (!auth_token) {
            return Rx_1.Observable.throw(new Error('no auth token available from the authenticationService'));
        }
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json'); // add the content type to the headers
        headers.append('x-auth-token', auth_token); // add the token to the headers
        var url = 'http://' + location.host + ("/api/word_lists/" + username + "/" + listTitle);
        // return an observable of the array of word lists
        return this.http.get(url, { headers: headers }).map(function (res) { return _this.extractData(res, 'words'); });
    };
    ListService.prototype.getWordListData = function (username, listTitle) {
        // get the token and throw an error if none is available
        var auth_token = this.authenticationService.getToken();
        if (!auth_token) {
            return Rx_1.Observable.throw(new Error('no auth token available from the authenticationService'));
        }
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json'); // add the content type to the headers
        headers.append('x-auth-token', auth_token); // add the token to the headers
        var url = 'http://' + location.host + ("/api/word_lists/" + username + "/" + listTitle);
        // return an observable of the body returned by the server
        return this.http.get(url, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    ListService.prototype.updateList = function (username, oldListTitle, updateData) {
        // put together object to send to the server in case the one passed in is badly formatted and to strip off unneeded fields
        var requestBody = { title: updateData.title, words: updateData.words };
        // get the token and throw an error if none is available
        var auth_token = this.authenticationService.getToken();
        if (!auth_token) {
            return Rx_1.Observable.throw(new Error('no auth token available from the authenticationService'));
        }
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json'); // add the content type to the headers
        headers.append('x-auth-token', auth_token); // add the token to the headers
        var url = 'http://' + location.host + ("/api/word_lists/" + username + "/" + oldListTitle);
        // return an observable of the extracted json body
        return this.http.put(url, requestBody, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    ListService.prototype.deleteList = function (username, listTitle) {
        // get the token and throw an error if none is available
        var auth_token = this.authenticationService.getToken();
        if (!auth_token) {
            return Rx_1.Observable.throw(new Error('no auth token available from the authenticationService'));
        }
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json'); // add the content type to the headers
        headers.append('x-auth-token', auth_token); // add the token to the headers
        var url = 'http://' + location.host + ("/api/word_lists/" + username + "/" + listTitle);
        // return an observable of the extracted json body
        return this.http.delete(url, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    // extracts from a response stream the json property with the name propertyName
    ListService.prototype.extractData = function (res, propertyName) {
        // extract the json body
        var body = res.json() || {};
        console.log(body);
        // make sure the property is within the body (if no body provided, this error will be triggered)
        if (!body[propertyName]) {
            Rx_1.Observable.throw(new Error("no property named " + propertyName + " in response body"));
        }
        // if all goes well, return the property
        return body[propertyName];
    };
    ListService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, authentication_service_1.AuthenticationService])
    ], ListService);
    return ListService;
}());
exports.ListService = ListService;
//# sourceMappingURL=list.service.js.map